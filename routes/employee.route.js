const router=require('express').Router()
const {check, validationResult}=require('express-validator')
const employeeModel=require('../models/employee.model')
const superUser=require('../middleware/superUser.middleware')
const employee=require('../middleware/employee.middleware')
const bcrypt=require('bcryptjs')
const config=require('config')
const mongoose = require('mongoose')
const taskModel = require('../models/task.model')

// get request for tasks of current employee
router.get('/login', employee, async(req, res)=>{
    try {
        const tasks=await taskModel.find({employeeId: req.userInfo.id})
        if(!tasks) return res.status(200).json({message: 'No tasks found of the respective employee', success: false})
        res.status(200).json(tasks)
    } catch (err) {
        console.error(err.message)
        res.status(500).json|({message: 'Server Error', success: false})
    }
})

// get request for all employees
router.get('/', superUser, async(req, res)=>{
    try { 
        const employees=await employeeModel.find().select('-password')
        if(!employees) return res.status(200).json({message: 'No employees found', success: false})
        res.status(200).json(employees)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// get request for a single employee
router.get('/:employee_id', superUser, async(req, res)=>{
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.employee_id)) return res.status(400).json({message: 'Invalid Id', success: false})
        const employee=await employeeModel.findById(req.params.employee_id)
        if(!employee) return res.status(200).json({message: 'No employee found', success: false})
        res.status(200).json(employee)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// post request for adding a employee
router.post('/', [superUser, [
    check('designation', 'Please provide a designation').not().isEmpty(),
    check('name', 'Please provide a name').not().isEmpty(),
    check('email', 'Please provide a email').isEmail(),
    check('password', 'Please provide a password').isLength({min: 8})
]], async(req, res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    const {name, email, password, designation}=req.body
    
    try {
        const employee=await employeeModel.findOne({email})
        if(employee) return res.status(200).json({message: 'Employee already exists', success: false})
        const newEmployee=await employeeModel({name, email, role: '2', password, designation})

        const salt=await bcrypt.genSalt(10)
        newEmployee.password=await bcrypt.hash(password, salt)
        await newEmployee.save()
        res.status(200).json({message: 'Employee added successfully', success: true})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }

})

// put request for updating a employee
router.put('/update/:employee_id', [superUser, [
    check('designation', 'Please provide a designation to update').not().isEmpty(),
    check('name', 'Please provide a name to update').not().isEmpty(),
    check('email', 'Please provide a email to update').isEmail(),
    check('password', 'Please provide a password to update').isLength({min: 8})
]], async(req, res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    const password=req.body
    
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.employee_id)) return res.status(400).json({message: 'Invalid Id', success: false})
        let employee=await employeeModel.findById(req.params.employee_id)

        if(!employee) return res.status(200).json({message: 'No employee found', success: false})

        employee=await employeeModel.findByIdAndUpdate({_id: req.params.employee_id}, {...req.body})

        const salt=await bcrypt.genSalt(10)
        employee.password=await bcrypt.hash(employee.password, salt)
        await employee.save()
        res.status(200).json({message: 'Employee updated successfully', success: true})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// delete request to delete an employee
router.delete('/:employee_id', superUser, async(req, res)=>{
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.employee_id)) return res.status(400).json({message: 'Invalid Id', success: false})
        const employee=await employeeModel.findByIdAndRemove(req.params.employee_id)
        if(!employee) return res.status(200).json({message: 'No employee found', success: false})
        res.status(200).json({message: 'Employee info removed successfully', success: true})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

module.exports=router