const employeeModel=require('../models/employee.model')
const projectModel=require('../models/project.model')
const taskModel=require('../models/task.model')
const nodemailer=require('nodemailer')
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const lodash=require('lodash')
const config=require('config')
const {ResponseMsg} = require('../config/helpers')

// SUPERUSER
// retrieve data for all employees
module.exports.getEmployees=async(req, res)=>{
    try {
        // filters
        const {page=1, limit=100000, sort}=req.query
        const search=req.query.search||""
        const nsort=sort==="ascending"?1:-1
        const pipeline=[
            {$project: {password: 0}},
            {$sort: {created_date: nsort}},
            {$match: {$or: [{name: {$regex: search, $options: "i"}}, 
                            {designation: {$regex: search, $options: "i"}},
                            {email: {$regex: search, $options: "i"}}]}},
            {$skip: (page-1)*parseInt(limit)},
            {$limit: parseInt(limit)},
        ]
        // check existing employees
        const existingEmployees=await employeeModel.aggregate(pipeline)
        if(!existingEmployees.length>0) return res.status(400).json(ResponseMsg("DataNotFound", "", "Employees", false))
        // display all employees
        res.status(200).json({success: true, data: existingEmployees.map(data=>data)})

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}

// EMPLOYEE
// display employee profile details
module.exports.getEmployeeProfile=async(req, res)=>{
    try {
        // check existing employee
        const existingEmployee=await employeeModel.findById({_id: req.userInfo.id}).select('-password')
        if(!existingEmployee) return res.status(400).json(ResponseMsg("DataNotFound", "", "Profile", false))
        // display employee
        res.status(200).json({success: true, data: existingEmployee})

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}

// EMPLOYEE
// display employee task details
module.exports.getEmployeeTasks=async(req, res)=>{
    try {
        // filters
        const {page=1, limit=100000, sort}=req.query
        const search=req.query.search||""
        const nsort=sort==="ascending"?1:-1
        const pipeline=[
            {$sort: {created_date: nsort}},
            {$match: {employeeId: mongoose.Types.ObjectId(req.userInfo.id), 
                      $or: [{projectName: {$regex: search, $options: "i"}}, 
                            {status: {$regex: search, $options: "i"}}, 
                            {priority: {$regex: search, $options: "i"}}, 
                            {taskName: {$regex: search, $options: "i"}}]}},
            {$skip: (page-1)*parseInt(limit)},
            {$limit: parseInt(limit)},
        ]
        // check existing tasks
        const existingTasks=await taskModel.aggregate(pipeline)
        if(!existingTasks.length>0) return res.status(400).json(ResponseMsg("DataNotFound", "", "Tasks", false))
        // display employee tasks
        res.status(200).json({success: true, data: existingTasks.map(data=>data)})

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}

// EMPLOYEE
// display employee today tasks
module.exports.getEmployeeDashboard=async(req, res)=>{
    try {
        // check existing tasks
        const todayTasks=[]
        const existingTasks=await taskModel.find({employeeId: req.userInfo.id})
        if(!existingTasks.length>0) return res.status(400).json(ResponseMsg("DataNotFound", "", "Tasks", false))
        existingTasks.map(task=>{
            if(task.created_date.toLocaleDateString()===new Date().toLocaleDateString()) todayTasks.push(task)
        })
        // display employee tasks
        res.status(200).json({success: true, data: todayTasks})

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}

// SUPERUSER
// retrieve data for a single employee
module.exports.getEmployee=async(req, res)=>{
    try {
        // check url employee id
        if(!mongoose.Types.ObjectId.isValid(req.params.employee_id)) return res.status(400).json(ResponseMsg("FieldInvalid", "EmployeeID", "", false))
        // check existing employee
        const existingEmployee=await employeeModel.findById(req.params.employee_id).select('-password')
        if(!existingEmployee) return res.status(400).json(ResponseMsg("DataNotFound", "", "Employee", false))
        // display employee details
        res.status(200).json({success: true, data: existingEmployee})

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}

// SUPERUSER
// create a new employee
module.exports.createEmployee=async(req, res)=>{
    const {gender, name, password, designation}=req.body
    let {email}=req.body
    const errors=[]
    // check name
    if(!name) errors.push("name is required") 
    // check gender
    if(!gender) errors.push("gender is required") 
    // check gender
    if(!gender) errors.push("gender is required") 
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
        email=email.toLowerCase()
        email=email.toLowerCase()
        // check existing employee
        const existingEmployee=await employeeModel.findOne({email})
        if(existingEmployee) return res.status(400).json(ResponseMsg("DataExists", "", "Employee", false))
        // create new employee
        const newEmployee=await employeeModel({gender, gender, name, email, role: 2, password, designation})
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

        res.status(200).json(ResponseMsg("AddSuccess", "", "Employee", true))

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}

// EMPLOYEE
// add total time on task
module.exports.addTotalTime=async(req, res)=>{
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
        if(!mongoose.Types.ObjectId.isValid(req.params.task_id)) return res.status(400).json(ResponseMsg("FieldInvalid", "EmployeeID", "", false))
        // check existing task
        const existingTask=await taskModel.findById({_id: req.params.task_id})
        if(!existingTask) return res.status(400).json(ResponseMsg("DataNotFound", "", "Task", false))
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
        res.status(200).json(ResponseMsg("AddSuccess", "", "Time", true))

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}

// EMPLOYEE
// update status of task by employee
module.exports.updateTaskStatus=async(req, res)=>{
    const status=req.body.status
    const errors=[]
    // check designation
    if(!status) errors.push("Status value is required") 
    // display errors
    if(errors.length>0) return res.status(400).json({errors: errors, success: false})

    try {
        // check url task id
        if(!mongoose.Types.ObjectId.isValid(req.params.task_id)) return res.status(400).json(ResponseMsg("FieldInvalid", "EmployeeID", "", false))
        // check existing task
        const existingTask=await taskModel.findById(req.params.task_id)
        if(!existingTask) return res.status(400).json(ResponseMsg("DataNotFound", "", "Task", false))
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
        res.status(200).json(ResponseMsg("UpdateSuccess", "", "Task Status", true)) 

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}

// SUPERUSER
// update employee info
module.exports.updateEmployee=async(req, res)=>{
    const {gender, name, designation}=req.body
    let {email}=req.body
    const errors=[]
    // check name
    if(!name) errors.push("name is required") 
    // check gender
    if(!gender) errors.push("gender is required") 
    // check designation
    if(!designation) errors.push("designation is required") 
    // check email
    if(!email) errors.push("Email Id is required") 
    else if(email&&!email.includes('@')&&!email.endsWith('.com')) errors.push("Invalid Email Id") 
    // display errors
    if(errors.length>0) return res.status(400).json({errors: errors, success: false})
    
    try {
        email=email.toLowerCase()
        // check url employee id
        if(!mongoose.Types.ObjectId.isValid(req.params.employee_id)) return res.status(400).json(ResponseMsg("FieldInvalid", "EmployeeID", "", false))
        // check existing employee
        const existingEmployee=await employeeModel.findById(req.params.employee_id)
        if(!existingEmployee) return res.status(400).json(ResponseMsg("DataNotFound", "", "Employee", false))
        // check email
        const existingEmployeeEmail=await employeeModel.findOne({email})
        if(existingEmployeeEmail) if(existingEmployee.id!==existingEmployeeEmail.id) return res.status(400).json(ResponseMsg("DataWithFieldExists", "EmailID", "Employee", false))
        // update employee details
        const updateEmployee=await employeeModel.findByIdAndUpdate({_id: req.params.employee_id}, {...req.body})
        // save employee details
        await updateEmployee.save()
        res.status(200).json(ResponseMsg("UpdateSuccess", "", "Employee", true))

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}

// EMPLOYEE
// update employee info
module.exports.employeeUpdateProfile=async(req, res)=>{
    const {gender, name, designation}=req.body
    let {email}=req.body
    const errors=[]
    // check name
    if(!name) errors.push("name is required") 
    // check gender
    if(!gender) errors.push("gender is required") 
    // check designation
    if(!designation) errors.push("designation is required") 
    // check email
    if(!email) errors.push("Email Id is required") 
    else if(email&&!email.includes('@')&&!email.endsWith('.com')) errors.push("Invalid Email Id") 
    // display errors
    if(errors.length>0) return res.status(400).json({errors: errors, success: false})
    
    try {
        email=email.toLowerCase()
        // check url employee id
        if(!mongoose.Types.ObjectId.isValid(req.params.employee_id)) return res.status(400).json(ResponseMsg("FieldInvalid", "EmployeeID", "", false))
        // check existing employee
        const existingEmployee=await employeeModel.findById(req.params.employee_id)
        if(!existingEmployee) return res.status(400).json(ResponseMsg("DataNotFound", "", "Employee", false))
        // check email
        const existingEmployeeEmail=await employeeModel.findOne({email})
        if(existingEmployeeEmail) if(existingEmployee.id!==existingEmployeeEmail.id) return res.status(400).json(ResponseMsg("DataWithFieldExists", "EmailID", "Employee", false))
        // update employee details
        const updateEmployee=await employeeModel.findByIdAndUpdate({_id: req.params.employee_id}, {...req.body})
        // save employee details
        await updateEmployee.save()
        res.status(200).json(ResponseMsg("UpdateSuccess", "", "Profile", true))

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}

// EMPLOYEE
// update employee profile password
module.exports.employeeUpdatePassword=async(req, res)=>{
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
        if(!existingEmployee) return res.status(400).json(ResponseMsg("DataNotFound", "", "Employee", false)) 
        // password updation of employee
        const isMatch=await bcrypt.compare(oldPassword, existingEmployee.password)
        if(!isMatch) return res.status(400).json(ResponseMsg("FieldInvalid", "Old Password", "", false)) 
        if(password===oldPassword) return res.status(400).json(ResponseMsg("OldNewPasswordMatch", "", "", false)) 
        if(password!==confirmPassword) return res.status(400).json(ResponseMsg("PasswordNotMatch", "", "", false)) 
        // update employee password
        const updateEmployee=await employeeModel.findByIdAndUpdate({_id: req.userInfo.id}, {...req.body})
        // password hash
        const salt=await bcrypt.genSalt(10)
        updateEmployee.password=await bcrypt.hash(password, salt)
        // save employee password
        await updateEmployee.save()
        res.status(200).json(ResponseMsg("UpdateSuccess", "", "Password", true)) 
        
    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}

// SUPERUSER
// delete employee
module.exports.deleteEmployee=async(req, res)=>{
    try {
        // check url employee id
        if(!mongoose.Types.ObjectId.isValid(req.params.employee_id)) return res.status(400).json(ResponseMsg("FieldInvalid", "EmployeeID", "", false))
        // check existing employee and remove
        const existingEmployee=await employeeModel.findByIdAndRemove(req.params.employee_id)
        if(!existingEmployee) return res.status(400).json(ResponseMsg("DataNotFound", "", "Employee", false))
        res.status(200).json(ResponseMsg("DeleteSuccess", "", "Employee", true))

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}