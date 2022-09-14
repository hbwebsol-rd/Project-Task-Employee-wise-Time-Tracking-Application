const router=require('express').Router()
const {check, validationResult}=require('express-validator')
const employeeModel=require('../models/employee.model')
const superUser=require('../middleware/auth.middleware')
const employee=require('../middleware/employee.middleware')
const bcrypt=require('bcryptjs')
const mongoose = require('mongoose')
const taskModel = require('../models/task.model')
const lodash=require('lodash')
const nodemailer = require('nodemailer');
const config=require('config')
const projectModel = require('../models/project.model')

// SUPER-USER/ADMIN
// get all employees details
router.get('/getEmployees', superUser, async(req, res)=>{
    try {
        // filters
        const {page=1, limit=10, sort}=req.query
        const search=req.query.search||""
        const nsort=sort==="desc"?-1:1
        const pipeline=[
            {$project: {password: 0}},
            {$sort: {name: nsort}},
            {$match: {$or: [{name: {$regex: search, $options: "i"}}, 
                            {designation: {$regex: search, $options: "i"}},
                            {email: {$regex: search, $options: "i"}}]}},
            {$skip: (page-1)*parseInt(limit)},
            {$limit: parseInt(limit)},
        ]
        // check existing employees
        const existingEmployees=await employeeModel.aggregate(pipeline)
        if(!existingEmployees.length>0) return res.status(400).json({message: 'No employees found', success: false})
        // display all employees
        res.status(200).json({success: true, data: existingEmployees.map(data=>data)})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// EMPLOYEE
// Display employee details
router.get('/me/profile', employee, async(req, res)=>{
    try {
        // check existing employee
        const existingEmployee=await employeeModel.findById({_id: req.userInfo.id}).select('-password')
        if(!existingEmployee) return res.status(400).json({message: 'Profile not found', success: false})
        // display employee
        res.status(200).json({success: true, data: existingEmployee})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// EMPLOYEE
// Display employee task details
router.get('/me/tasks', employee, async(req, res)=>{
    try {
        // filters
        const {page=1, limit=10, sort}=req.query
        const search=req.query.search||""
        const nsort=sort==="desc"?-1:1
        const pipeline=[
            {$sort: {taskName: nsort} },
            {$match: {employeeName: req.userInfo.name, 
                      $or: [{projectName: {$regex: search, $options: "i"}}, 
                            {status: {$regex: search, $options: "i"}}, 
                            {priority: {$regex: search, $options: "i"}}, 
                            {taskName: {$regex: search, $options: "i"}}]}},
            {$skip: (page-1)*parseInt(limit)},
            {$limit: parseInt(limit)},
        ]
        // check existing tasks
        const existingTasks=await taskModel.aggregate(pipeline)
        if(!existingTasks.length>0) return res.status(400).json({message: 'No tasks found', success: false})
        // display employee tasks
        res.status(200).json({success: true, data: existingTasks.map(data=>data)})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// SUPER-USER/ADMIN
// get a single employee
router.get('/getEmployee/:employee_id', superUser, async(req, res)=>{
    try {
        // check url employee id
        if(!mongoose.Types.ObjectId.isValid(req.params.employee_id)) return res.status(400).json({message: 'Invalid Employee Id', success: false})
        // check existing employee
        const existingEmployee=await employeeModel.findById(req.params.employee_id).select('-password')
        if(!existingEmployee) return res.status(400).json({message: 'No employee found', success: false})
        // display employee details
        res.status(200).json({success: true, data: existingEmployee})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// SUPER-USER/ADMIN
// add an employee
router.post('/addEmployee', [superUser, [
    check('name'), check('email'), check('password'), check('designation'),
]], async(req, res)=>{
    const {name, email, password, designation}=req.body
    const errors=[]
    // check name
    if(!name) errors.push("name is required") 
    // check designation
    if(!designation) errors.push("designation is required") 
    // check email
    if(!email) errors.push("email is required") 
    else if(email&&!email.includes('@')||!email.endsWith('.com')) errors.push("Invalid Email Id") 
    // check password
    if(!password) errors.push("password is required") 
    else if(password&&password.length<8) errors.push("Invalid password")
    // display errors
    if(errors.length>0) return res.status(400).json({errors: errors, success: false})

    try {
        // check existing employee
        const existingEmployee=await employeeModel.findOne({email})
        if(existingEmployee) return res.status(400).json({message: 'Employee already exists', success: false})
        // create new employee
        const newEmployee=await employeeModel({name, email, role: 2, password, designation})
        // password hash
        const salt=await bcrypt.genSalt(10)
        newEmployee.password=await bcrypt.hash(password, salt)
        // save new employee
        await newEmployee.save()
        // send mail using nodemailer
        const tranporter=nodemailer.createTransport({
            service: 'smtp@gmail.com',
            port: 465,
            secure: true,
            requireTLS: true,
            auth: {
                user: `${config.get('superUserm')}`,
                pass: `${config.get('superUserp')}`
            }
        })
        // mail contents
        const mailOptions={
            from: `${config.get('superUserm')}`,
            to: `${req.body.email}`,
            subject: `Welcome to the Team!`,
            html: `<p>Thank you for registering with us</p>
                    <hr>
                    <h3>Your Login Details are:</h3>
                    <h4 style="color: #82b0fd;">Email ID: <u>${req.body.email}</u><br>Password: <u>${req.body.password}</u></h4>
                    <hr>`
        }
        // send mail
        tranporter.sendMail(mailOptions, (err, info)=>{
            if(err) throw err
            res.status(200).json({Info: info.response})
        })

        res.status(200).json({message: 'Employee added successfully', success: true})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// EMPLOYEE
// add total time on task
router.put('/me/task/addTotalTime/:task_id', [employee, [
    check('from'), check('to')
]], async(req, res)=>{
    const {from, to}=req.body
    const errors=[]
    // check name
    if(!from) errors.push("Strating time is required") 
    // check designation
    if(!to) errors.push("Ending time is required") 
    // display errors
    if(errors.length>0) return res.status(400).json({errors: errors, success: false})

    try {
        // check url task id
        if(!mongoose.Types.ObjectId.isValid(req.params.task_id)) return res.status(400).json({message: 'Invalid Employee Id', success: false})
        // check existing task
        const existingTask=await taskModel.findById({_id: req.params.task_id})
        if(!existingTask) return res.status(400).json({message: 'No task found', success: false})
        while(existingTask.totalTime.length>0){
            const y=(existingTask.totalTime[0].from.getFullYear()===new Date().getFullYear())
            const m=(existingTask.totalTime[0].from.getMonth()+1===new Date().getMonth()+1)
            const d=(existingTask.totalTime[0].from.getDate()===new Date().getDate())
            if(y, m, d) return res.status(400).json({message: 'Cannot re-enter on same date', success: false})
            break
        } 
        // add total time in task
        existingTask.totalTime.unshift({from, to})
        // save updated task
        await existingTask.save()
        // calculating time on work per day
        const grandTotal=[]
        existingTask.totalTime.map((time)=>{
            const timeFrom=time.from.getHours()
            const timeTo=time.to.getHours()
            const actualTime=Math.abs(timeFrom-timeTo)
            grandTotal.push(actualTime)
        })
        // update timeOnTask field
        existingTask.timeOnTask=lodash.sum(grandTotal)
        // re-save updated task
        await existingTask.save()
        res.status(200).json({message: 'Total time added successfully', success: true})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// SUPER-USER/ADMIN
// update employee details
router.patch('/updateEmployee/:employee_id', [superUser, [
    check('name'), check('email'), check('designation')
]], async(req, res)=>{
    const {name, designation, email}=req.body
    const errors=[]
    // check name
    if(!name) errors.push("name is required") 
    // check designation
    if(!designation) errors.push("designation is required") 
    // check email
    if(!email) errors.push("Email Id is required") 
    else if(email&&!email.includes('@')&&!email.endsWith('.com')) errors.push("Invalid Email Id") 
    // display errors
    if(errors.length>0) return res.status(400).json({errors: errors, success: false})
    
    try {
        // check url employee id
        if(!mongoose.Types.ObjectId.isValid(req.params.employee_id)) return res.status(400).json({message: 'Invalid Employee Id', success: false})
        // check existing employee
        const existingEmployee=await employeeModel.findById(req.params.employee_id)
        if(!existingEmployee) return res.status(400).json({message: 'No employee found', success: false})
        // check email
        const existingEmployeeEmail=await employeeModel.findOne({email})
        if(existingEmployeeEmail) if(existingEmployee.id!==existingEmployeeEmail.id) return res.status(400).json({message: 'Employee with same Email Id exists', success: false})
        // update employee details
        const updateEmployee=await employeeModel.findByIdAndUpdate({_id: req.params.employee_id}, {...req.body})
        // save employee details
        await updateEmployee.save()
        res.status(200).json({message: 'Employee updated successfully', success: true})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// EMPLOYEE
// update employee password
router.patch('/me/profile/update', [employee, [
    check('oldPassword'), check('password'), check('confirmPassword'),
]], async(req, res)=>{
    const {oldPassword, password, confirmPassword}=req.body
    const errors=[]
    // check old password
    if(!oldPassword) errors.push("Old Password is required") 
    else if(oldPassword&&oldPassword.length<8) errors.push("Invalid password")
    // check new password
    if(!password) errors.push("Password is required") 
    else if(password&&password.length<8) errors.push("Invalid password")
    // check confirm password
    if(!confirmPassword) errors.push("Password Confirmation is required") 
    else if(confirmPassword&&confirmPassword.length<8) errors.push("Invalid password")
    // display errors
    if(errors.length>0) return res.status(400).json({errors: errors, success: false})

    try {
        // check existing employee
        const existingEmployee=await employeeModel.findById({_id: req.userInfo.id})
        if(!existingEmployee) return res.status(400).json({message: 'No employee found', success: true}) 
        // password updation of employee
        const isMatch=await bcrypt.compare(oldPassword, existingEmployee.password)
        if(!isMatch) return res.status(400).json({message: 'Old password incorrect', success: false}) 
        if(password===oldPassword) return res.status(400).json({message: 'New password cannot be same as old password', success: false}) 
        if(password!==confirmPassword) return res.status(400).json({message: 'Password does not match', success: false}) 
        // update employee password
        const updateEmployee=await employeeModel.findByIdAndUpdate({_id: req.userInfo.id}, {...req.body})
        // password hash
        const salt=await bcrypt.genSalt(10)
        updateEmployee.password=await bcrypt.hash(password, salt)
        // save employee password
        await updateEmployee.save()
        res.status(200).json({message: 'Password updated successfully', success: true}) 
        
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// EMPLOYEE
// update status of task by employee
router.patch('/me/task/updateStatus/:task_id', [employee, [
    check('status', 'Task status required').not().isEmpty()
]], async(req, res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array().map(error=>error.msg), success: false})

    const status=req.body.status
    try {
        // check url task id
        if(!mongoose.Types.ObjectId.isValid(req.params.task_id)) return res.status(400).json({message: 'Invalid Employee Id', success: false})
        // check existing task
        const existingTask=await taskModel.findById(req.params.task_id)
        if(!existingTask) return res.status(400).json({message: 'Task not found', success: false})
        // update task status
        const updateTaskStatus=await taskModel.findByIdAndUpdate(req.params.task_id, {...req.body})
        // save task status
        await updateTaskStatus.save()
        // send mail using nodemailer
        const transporter=nodemailer.createTransport({
            service: 'smtp@gmail.com',
            port: 465,
            secyre: true,
            requireTLS: true,
            auth: {
                user: `${config.get('superUserm')}`,
                pass: `${config.get('superUserp')}`
            }
        })
        // mail contents
        const employeeInfo=await employeeModel.findOne({name: existingTask.employeeName})
        const projectInfo=await projectModel.findOne({name: existingTask.projectName})
        const mailOptions={
            from: `${config.get('superUserm')} ${employeeInfo.name}`,
            to: `${config.get('superUserm')}`,
            subject: 'Status Update',
            html: `<p>There has been a <b>status update</b> by ${employeeInfo.name}/${employeeInfo.email}</p>
                    <hr>
                    <p>${employeeInfo.name}</p>
                    <h4 style="color: #82b0fd;">Project <u>${projectInfo.name}</u> has been updated from <u style="color: red;">${existingTask.status}</u> to <u style="color: green;">${req.body.status}</u>.</h4>
                    <hr>`
        }
        // send mail
        if(req.body.status==="Done") transporter.sendMail(mailOptions, (err, info)=>{
            if(err) throw err
            res.status(200).json({Info: info.response}) 
        })
        res.status(200).json({message: 'Status updated successfully', success: true}) 

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// SUPER-USER/ADMIN
// delete an employee
router.delete('/deleteEmployee/:employee_id', superUser, async(req, res)=>{
    try {
        // check url employee id
        if(!mongoose.Types.ObjectId.isValid(req.params.employee_id)) return res.status(400).json({message: 'Invalid Employee Id', success: false})
        // check existing employee and remove
        const existingEmployee=await employeeModel.findByIdAndRemove(req.params.employee_id)
        if(!existingEmployee) return res.status(400).json({message: 'No employee found', success: false})
        res.status(200).json({message: 'Employee Removed Successfully', success: true})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

module.exports=router