const taskModel=require('../models/task.model')
const projectModel=require('../models/project.model')
const employeeModel=require('../models/employee.model')
const customerModel = require('../models/customer.model')
const mongoose=require('mongoose')
const nodemailer=require('nodemailer')
const config=require('config')

// get data for all tasks
module.exports.getTasks=async(req, res)=>{
    try {
        // filters
        const {page=1, limit=1000, sort}=req.query
        const search=req.query.search||""
        const nsort=sort==="ascending"?1:-1
        const pipeline=[
            {$sort: {created_date: nsort}},
            {$lookup: {
                from: "projects",
                localField: "projectId",
                foreignField: "_id",
                as: "projectName"
            }},
            {$set: {projectName: {$arrayElemAt: ["$projectName.name", 0]}}},
            {$lookup: {
                from: "employees",
                localField: "employeeId",
                foreignField: "_id",
                as: "employeeName"
            }},
            {$set: {employeeName: {$arrayElemAt: ["$employeeName.name", 0]}}},
            {$match: { $or: [ {taskName: {$regex: search, $options: "i"}}, 
                              {projectName: {$regex: search, $options: "i"}}, 
                              {employeeName: {$regex: search, $options: "i"}}]}},
            {$skip: (page-1)*parseInt(limit)},
            {$limit: parseInt(limit)},
        ]
        // check existing tasks
        const existingTasks=await taskModel.aggregate(pipeline)
        if(!existingTasks.length>0) return res.status(404).json({message: 'No tasks found', success: false})
        // display all tasks
        res.status(200).json({success: true, data: existingTasks.map(data=>data)})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
}

// get data for a single task
module.exports.getTask=async(req, res)=>{
    try {
        // check url task id
        if(!mongoose.Types.ObjectId.isValid(req.params.task_id)) return res.status(400).json({message: 'Invalid Task Id', success: false})
        // check existing task
        const existingTask=await taskModel.findById(req.params.task_id)
        if(!existingTask) return res.status(200).json({message: 'No task found', success: false})
        // display task
        res.status(200).json({success: true, data: existingTask})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
}

// addTask dropdown
module.exports.addTaskDropdown=async(req, res)=>{
    try {
        // access employees and projects
        const pipeline=[
            { $limit: 1 },
            { $lookup: {
                    from: "projects",
                    localField: "all",
                    foreignField: "all",
                    as: "projects"
                } },
            { $lookup: {
                    from: "employees",
                    localField: "all",
                    foreignField: "all",
                    as: "employees"
                } },
                // systematic response
            {$project: {_id: 0, 
                        projects: {$map: 
                            {input: "$projects", as: "projects", in: 
                                {projectId: "$$projects._id", projectName: "$$projects.name"}}}, 
                        employees: {$map: 
                            {input: "$employees", as: "employees", in: 
                                {employeeId: "$$employees._id", employeeName: "$$employees.name"}}}}},
            ]
        // check existing customers
        const existingCustomers=await customerModel.aggregate(pipeline)
        // display customers
        res.status(200).json({success: true, data: existingCustomers.map(data=>data)})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
}

// create new task
module.exports.createTask=async(req, res)=>{
    const {taskName, employeeId, projectId, priority, status}=req.body
    const errors=[]
    // check task name
    if(!taskName) errors.push('Task name is required')
    // check project Id
    if(!projectId) errors.push('Project Id is required')
    else if(projectId&&!mongoose.Types.ObjectId.isValid(projectId)) errors.push('Enter a valid Project Id')
    // check employee Id
    if(!employeeId) errors.push('Employee Id is required')
    else if(employeeId&&!mongoose.Types.ObjectId.isValid(employeeId)) errors.push('Enter a valid Employee Id')
    // check priority
    if(!priority) errors.push('Priority is required')
    // check status
    if(!status) errors.push('status is required')
    // display errors
    if(errors.length>0) return res.status(400).json({errors: errors, success: false})
    
    try {
        // check existing project in project database by id 
        const existingProject=await projectModel.findById({_id: projectId})
        if(!existingProject) return res.status(404).json({message: 'No project found with that respective ID', success: false})
        // check existing employee in employee database by id
        const existingEmployee=await employeeModel.findById({_id: employeeId})
        if(!existingEmployee) return res.status(404).json({message: 'No employee found with that respective ID', success: false})
        // check if project and task name is same
        const existingTask=await taskModel.find({taskName: req.body.taskName})
        const existingTaskProjectIds=existingTask.map(data=>data.projectId)
        for(let i=0;i<existingTaskProjectIds.length;i++) if(existingProject._id===existingTaskProjectIds[i]) return res.status(404).json({message: 'Task already assigned', success: false})  
        // create new tasks
        const taskFields={taskName, priority, status, timeOnTask: 0, projectId, employeeId}
        let newTask=new taskModel(taskFields)
        // save new task
        await newTask.save()
        // Send mail using nodemailer
        const transporter=nodemailer.createTransport({
            service: 'smtp@gmail.com',
            port: 465,
            secure: true,
            requireTLS: true,
            auth: {
                user: `${config.get('superUserm')}`,
                pass: `${config.get('superUserp')}`
            }
        })
        // mail content
        const mailOptions={
            from: `${config.get('superUserm')} ${req.userInfo.name}`,
            to: `${existingEmployee.email}`,
            subject: `New Task Assigned!`,
            html: `<p>${req.userInfo.name} <b>assigned</b> this task to you</p>
                    <hr>
                    <p>${taskName}</p>
                    <h4 style="color: #82b0fd;">With utmost responsibility, you have been assigned ${existingProject.name} as your ${taskName}.</h4>
                    <hr>`
        }
        // mail send
        transporter.sendMail(mailOptions, (err, info)=>{
            if(err) throw err
            res.status(200).json({Info: info.response})
        })
        res.status(200).json({message: 'Task added successfully', success: true})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
}

// update task details
module.exports.updateTask=async(req, res)=>{
    const {taskName, employeeId, projectId, priority, status}=req.body
    const errors=[]
    // check task name
    if(!taskName) errors.push('Task name is required')
    // check project Id
    if(!projectId) errors.push('Project Id is required')
    else if(projectId&&!mongoose.Types.ObjectId.isValid(projectId)) errors.push('Enter a valid Project Id')
    // check employee Id
    if(!employeeId) errors.push('Employee Id is required')
    else if(employeeId&&!mongoose.Types.ObjectId.isValid(employeeId)) errors.push('Enter a valid Employee Id')
    // check priority
    if(!priority) errors.push('Priority is required')
    // check status
    if(!status) errors.push('status is required')
    // display errors
    if(errors.length>0) return res.status(400).json({errors: errors, success: false})

    try {
        // check url task id
        if(!mongoose.Types.ObjectId.isValid(req.params.task_id)) return res.status(400).json({message: 'Invalid Task Id', success: false})
        // check is task exists
        const task=await taskModel.findById(req.params.task_id)
        if(!task) return res.status(200).json({message: 'No task found', success: false})
        // check existing project in project database by id 
        const existingProject=await projectModel.findById({_id: projectId})
        if(!existingProject) return res.status(200).json({message: 'No project found with that respective ID', success: false})
        // check existing employee in employee database by id
        const existingEmployee=await employeeModel.findById({_id: employeeId})
        if(!existingEmployee) return res.status(200).json({message: 'No employee found with that respective ID', success: false})
        // update task details
        const taskFields={projectId, employeeId, timeOnTask: 0}
        const updateTask=await taskModel.findByIdAndUpdate({_id: req.params.task_id}, {$set: taskFields, ...req.body})
        // save task details
        await updateTask.save()
        res.status(200).json({message: 'Task updated successfully', success: true})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
}

// delete task
module.exports.deleteTask=async(req, res)=>{
    try {
        // check url task id
        if(!mongoose.Types.ObjectId.isValid(req.params.task_id)) return res.status(400).json({message: 'Invalid Task Id', success: false})
        // check existing task and remove
        const task=await taskModel.findByIdAndRemove(req.params.task_id)
        if(!task) return res.status(200).json({message: 'No task found', success: false})
        res.status(200).json({message: 'Task Removed Successfully', success: true})
        
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
}