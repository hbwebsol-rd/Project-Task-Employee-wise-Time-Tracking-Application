const router=require('express').Router()
const {check, validationResult}=require('express-validator')
const superUser=require('../middleware/superUser.middleware')
const taskModel=require('../models/task.model')
const projectModel=require('../models/project.model')
const employeeModel=require('../models/employee.model')
const mongoose = require('mongoose')

// get request for getting all task
router.get('/', superUser, async(req, res)=>{
    try {
        const tasks=await taskModel.find()
        if(!tasks) return res.status(200).json({message: 'No tasks found', success: false})
        res.status(200).json(tasks)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
}) 

// get request for a single task by id
router.get('/:task_id', superUser, async(req, res)=>{
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.task_id)) return res.status(400).json({message: 'Invalid Id', success: false})
        const task=await taskModel.findById(req.params.task_id)
        if(!task) return res.status(200).json({message: 'No task found', success: false})
        res.status(200).json(task)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// post request for adding a task
router.post('/', [superUser, [
    check('taskName', 'Please provide the task name').not().isEmpty(),
    check('projectName', 'Please provide the project name').not().isEmpty(),
    check('employeeName', 'Please provide the employee name').not().isEmpty(),
    check('priority', 'Please provide the priority of the task').not().isEmpty(),
    check('status', 'Please provide the status of the task').not().isEmpty(),
    check('timeOnTask', 'Please provide the time taken on the task').not().isEmpty(),
]], async(req, res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
    const {taskName, employeeName, projectName, priority, status, timeOnTask}=req.body

    try {
        let project=await projectModel.findOne({name: projectName})
        if(!project) return res.status(200).json({message: 'No project found with that respective name', success: false})
        let employee=await employeeModel.findOne({name: employeeName})
        if(!employee) return res.status(200).json({message: 'No employee found with that respective name', success: false})
        let tasks=await taskModel.find()
        let existingTask=await taskModel.findOne({_id: tasks.map(task=>task._id), projectId: project._id.toString(), employeeId: employee._id.toString()})
        if(existingTask) return res.status(200).json({message: 'Task already assigned', success: false})
        const taskFields={taskName, priority, status, timeOnTask, projectId: project._id.toString(), employeeId: employee._id.toString()}
        
        let newTask=new taskModel(taskFields)
        await newTask.save()
        res.status(200).json({message: 'Task added successfully', success: true})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// patch request for updating a task
router.put('/update/:task_id', [superUser, [
    check('taskName', 'Please provide the task name').not().isEmpty(),
    check('projectName', 'Please provide the project name').not().isEmpty(),
    check('employeeName', 'Please provide the employee name').not().isEmpty(),
    check('priority', 'Please provide the priority of the task').not().isEmpty(),
    check('status', 'Please provide the status of the task').not().isEmpty(),
    check('timeOnTask', 'Please provide the time taken on the task').not().isEmpty(),
]], async(req, res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
    const {employeeName, projectName}=req.body

    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.task_id)) return res.status(400).json({message: 'Invalid Id', success: false})
        let task=await taskModel.findById(req.params.task_id)
        if(!task) return res.status(200).json({message: 'No task found', success: false})
        let project=await projectModel.findOne({name: projectName})
        if(!project) return res.status(200).json({message: 'No project found with that respective name', success: false})
        let employee=await employeeModel.findOne({name: employeeName})
        if(!employee) return res.status(200).json({message: 'No employee found with that respective name', success: false})
        let existingTask=await taskModel.findOne({_id: req.params.task_id, projectId: project._id.toString(), employeeId: employee._id.toString()})
        if(existingTask) return res.status(200).json({message: 'Task already assigned', success: false})
        const taskFields={projectId: project._id.toString(), employeeId: employee._id.toString()}
        const updateTask=await taskModel.findByIdAndUpdate({_id: req.params.task_id}, {$set: taskFields, ...req.body})
        await updateTask.save()
        res.status(200).json({message: 'Task updated successfully', success: true})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// delete request for a single task
router.delete('/delete/:task_id', superUser, async(req, res)=>{
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.task_id)) return res.status(400).json({message: 'Invalid Id', success: false})
        const task=await taskModel.findByIdAndRemove(req.params.task_id)
        if(!task) return res.status(200).json({message: 'No task found', success: false})
        res.status(200).json({message: 'Task removed', success: true})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

module.exports=router