const timeSheetModel=require('../models/timesheet.model')
const taskModel=require('../models/task.model')
const employeeModel=require('../models/employee.model')
const mongoose=require('mongoose')

const {checkDateValidity,
       checkTimeCollision,
       checkTimeValidity,
       convertDate,
       convertTime,
       ResponseMsg} = require('../config/helpers')

// get all timesheets
module.exports.getTimesheets=async(req, res)=>{
    try {
        // check if admin or employee login
        const role = req.userInfo.role
        // filters
        const {page=1, limit=1000, sort}=req.query
        const search=req.query.search||""
        const nsort=sort==="ascending"?1:-1
        const pipeline=[
            {$sort: {created_date: nsort}},
            {$lookup: {
                from: "employees",
                localField: "employeeId",
                foreignField: "_id",
                as: "employeeName"
            }},
            {$set: {employeeName: {$arrayElemAt: ["$employeeName.name", 0]}}},
            {$lookup: {
                from: "tasks",
                localField: "taskId",
                foreignField: "_id",
                as: "taskName"
            }},
            {$set: {projectId: {$arrayElemAt: ["$taskName.projectId", 0]}}},
            {$set: {taskName: {$arrayElemAt: ["$taskName.taskName", 0]}}},
            {$lookup: {
                from: "projects",
                localField: "projectId",
                foreignField: "_id",
                as: "projectName"
            }},
            {$set: {projectName: {$arrayElemAt: ["$projectName.name", 0]}}},
            {$project: {projectId: 0}},
            {$match: {$or: [{taskName: {$regex: search, $options: "i"}},
                            {employeeName: {$regex: search, $options: "i"}},
                            {projectName: {$regex: search, $options: "i"}}]}},
            {$skip: (page-1)*parseInt(limit)},
            {$limit: parseInt(limit)}
        ]
        // check existing timesheets
        const existingTimesheets=await timeSheetModel.aggregate(pipeline)
        if(!existingTimesheets.length>0) return res.status(404).json(ResponseMsg("DataNotFound", null, "Timesheets", false))
        // console.log("////////////////////////////// time")
        // existingTimesheets.map(timesheet=>{
        //     console.log(timesheet.date.toLocaleString(), timesheet.startTime.toLocaleString(), timesheet.endTime.toLocaleString())
        // })
        // display timesheets
        res.status(200).json({success: true, data: existingTimesheets.map(data=>data)})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: "Server Error", success: false})
    }
}

// get todays timesheet
module.exports.getTodayTimesheets=async(req, res)=>{
    try {
        // check if admin or employee login
        const role = req.userInfo.role
        // filters
        const date=new Date()
        date.setHours(00,00,00,00)
        const {page=1, limit=1000, sort}=req.query
        const search=req.query.search||""
        const nsort=sort==="ascending"?1:-1
        const pipeline=[
            {$sort: {created_date: nsort}},
            {$lookup: {
                from: "employees",
                localField: "employeeId",
                foreignField: "_id",
                as: "employeeName"
            }},
            {$set: {employeeName: {$arrayElemAt: ["$employeeName.name", 0]}}},
            {$lookup: {
                from: "tasks",
                localField: "taskId",
                foreignField: "_id",
                as: "taskName"
            }},
            {$set: {projectId: {$arrayElemAt: ["$taskName.projectId", 0]}}},
            {$set: {taskName: {$arrayElemAt: ["$taskName.taskName", 0]}}},
            {$lookup: {
                from: "projects",
                localField: "projectId",
                foreignField: "_id",
                as: "projectName"
            }},
            {$set: {projectName: {$arrayElemAt: ["$projectName.name", 0]}}},
            {$project: {projectId: 0}},
            {$match: {date: date,
                      $or: [{taskName: {$regex: search, $options: "i"}},
                            {employeeName: {$regex: search, $options: "i"}},
                            {projectName: {$regex: search, $options: "i"}}]}},
            {$skip: (page-1)*parseInt(limit)},
            {$limit: parseInt(limit)}
        ]
        // check existing timesheets
        const existingTimesheets=await timeSheetModel.aggregate(pipeline)
        if(!existingTimesheets.length>0) return res.status(404).json(ResponseMsg("DataNotFound", null, "Timesheets", false))
        // existingTimesheets.map(timesheet=>{
        //     console.log(timesheet.date.toLocaleString(), timesheet._id.toString())
        // })
        // display timesheets
        res.status(200).json({success: true, data: existingTimesheets.map(data=>data)})

    } catch (err) {
        console.error(err.message)
    }
}

// get yesterdays timesheet
module.exports.getYesterdayTimesheets=async(req, res)=>{
    try {
        // check if admin or employee login
        const role = req.userInfo.role
        // filters
        const date=new Date()
        date.setDate(date.getDate()-1)
        date.setHours(00,00,00,00)
        const {page=1, limit=1000, sort}=req.query
        const search=req.query.search||""
        const nsort=sort==="ascending"?1:-1
        const pipeline=[
            {$sort: {created_date: nsort}},
            {$lookup: {
                from: "employees",
                localField: "employeeId",
                foreignField: "_id",
                as: "employeeName"
            }},
            {$set: {employeeName: {$arrayElemAt: ["$employeeName.name", 0]}}},
            {$lookup: {
                from: "tasks",
                localField: "taskId",
                foreignField: "_id",
                as: "taskName"
            }},
            {$set: {projectId: {$arrayElemAt: ["$taskName.projectId", 0]}}},
            {$set: {taskName: {$arrayElemAt: ["$taskName.taskName", 0]}}},
            {$lookup: {
                from: "projects",
                localField: "projectId",
                foreignField: "_id",
                as: "projectName"
            }},
            {$set: {projectName: {$arrayElemAt: ["$projectName.name", 0]}}},
            {$project: {projectId: 0}},
            {$match: {date: date,
                      $or: [{taskName: {$regex: search, $options: "i"}},
                            {employeeName: {$regex: search, $options: "i"}},
                            {projectName: {$regex: search, $options: "i"}}]}},
            {$skip: (page-1)*parseInt(limit)},
            {$limit: parseInt(limit)}
        ]
        // check existing timesheets
        const existingTimesheets=await timeSheetModel.aggregate(pipeline)
        if(!existingTimesheets.length>0) return res.status(404).json(ResponseMsg("DataNotFound", null, "Timesheets", false))
        // existingTimesheets.map(timesheet=>{
        //     console.log(timesheet.date.toLocaleString(), timesheet._id.toString())
        // })
        // display timesheets
        res.status(200).json({success: true, data: existingTimesheets.map(data=>data)})

    } catch (err) {
        console.error(err.message)
    }
}

// get yesterdays timesheet
module.exports.getCustomTimesheets=async(req, res)=>{
    const {startDate, endDate}=req.body
    // const error=[]
    // check startDate
    if(!startDate) return res.json({message: "StartDate is a compulsory field", success: false})
    // check endDate
    if(!endDate) return res.json({message: "EndDate is a compulsory field", success: false})

    try {
        // check if admin or employee login
        const role = req.userInfo.role
        // convert input to proper date and check date validity
        const timesheetStartDate = convertDate(startDate)
        const timesheetEndDate = convertDate(endDate)
        if(checkDateValidity(timesheetStartDate, timesheetEndDate)) return res.status(404).json(ResponseMsg("InvalidDate", null, null, false))
        // filters
        const {page=1, limit=1000, sort}=req.query
        const search=req.query.search||""
        const nsort=sort==="ascending"?1:-1
        const pipeline=[
            {$sort: {created_date: nsort}},
            {$lookup: {
                from: "employees",
                localField: "employeeId",
                foreignField: "_id",
                as: "employeeName"
            }},
            {$set: {employeeName: {$arrayElemAt: ["$employeeName.name", 0]}}},
            {$lookup: {
                from: "tasks",
                localField: "taskId",
                foreignField: "_id",
                as: "taskName"
            }},
            {$set: {projectId: {$arrayElemAt: ["$taskName.projectId", 0]}}},
            {$set: {taskName: {$arrayElemAt: ["$taskName.taskName", 0]}}},
            {$lookup: {
                from: "projects",
                localField: "projectId",
                foreignField: "_id",
                as: "projectName"
            }},
            {$set: {projectName: {$arrayElemAt: ["$projectName.name", 0]}}},
            {$project: {projectId: 0}},
            {$match: {$and: [{date: {$gte: timesheetStartDate}}, {date: {$lt: timesheetEndDate}}],
                      $or: [{taskName: {$regex: search, $options: "i"}},
                            {employeeName: {$regex: search, $options: "i"}},
                            {projectName: {$regex: search, $options: "i"}}]}},
            {$skip: (page-1)*parseInt(limit)},
            {$limit: parseInt(limit)}
        ]
        // check existing timesheets
        const existingTimesheets=await timeSheetModel.aggregate(pipeline)
        if(!existingTimesheets.length>0) return res.status(404).json(ResponseMsg("DataNotFound", null, "Timesheets", false))
        // existingTimesheets.map(timesheet=>{
        //     console.log(timesheet.date.toLocaleString())
        // })
        // display timesheets
        res.status(200).json({success: true, data: existingTimesheets.map(data=>data)})

    } catch (err) {
        console.error(err.message)
    }
}

// add timesheet
module.exports.createTimesheet=async(req, res)=>{
    const {taskId, date, startTime, endTime, note}=req.body
    // const error=[]
    // check taskId
    if(!taskId) return res.json({message: "TaskId is a compulsory field", success: false})
    else if(taskId&&!mongoose.Types.ObjectId.isValid(taskId)) return res.json({message: "Invalid TaskId", success: false})
    // chek date
    if(!date) return res.json({message: "Date is a compulsory field", success: false})
    // check startTime
    if(!startTime) return res.json({message: "StartTime is a compulsory field", success: false})
    // check endTime
    if(!endTime) return res.json({message: "EndTime is a compulsory field", success: false})

    try {
        // check existing task in database
        const existingTask=await taskModel.findById({_id: taskId})
        if(!existingTask) return res.status(404).json(ResponseMsg("DataIDNotFound", null, "Task", false))
        // check if employeeId by user matches employeeId in task
        if(req.userInfo.id!==existingTask.employeeId.toString()) return res.status(404).json(ResponseMsg("FieldNotFoundInData", "Employee", "Task", false))
        // convert input dd-mm-yyyy to output mm-dd-yyyy format
        const newDate = convertDate(date)
        // check if future date
        const currentDate = new Date()
        if(newDate.toLocaleDateString() > currentDate.toLocaleDateString()) return res.status(404).json(ResponseMsg("FieldInvalid", "Date", null, false))
        // task start and end time conversion
        const taskStartTime = convertTime(startTime, newDate)
        const taskEndTime = convertTime(endTime, newDate)
        // check time validity
        if(checkTimeValidity(taskStartTime, taskEndTime)) return res.status(404).json(ResponseMsg("InvalidTime", null, null, false))
        // check if user enters same timesheet
        const sameTimesheet=await timeSheetModel.findOne({$and: [{taskId: taskId}, {date: newDate}, {startTime: taskStartTime}, {endTime: taskEndTime}, {employeeId: req.userInfo.id}]})
        if(sameTimesheet) return res.status(404).json(ResponseMsg("DataExists", null, "Timesheet", false))
        // check time collision
        const sameDateTimesheet = await timeSheetModel.find({date: newDate, employeeId: req.userInfo.id})
        if(sameDateTimesheet.length>0){
            let sameData=false
            sameDateTimesheet.map(timesheet=>{
                if(checkTimeCollision(taskStartTime, timesheet.startTime, timesheet.endTime)) sameData=true 
                if(checkTimeCollision(taskEndTime, timesheet.startTime, timesheet.endTime)) sameData=true 
            })
            if(sameData) return res.status(404).json(ResponseMsg("TimeCollision", null, "Timesheet", false))
        }
        // prepare new timesheet
        const newTimesheet=await timeSheetModel({employeeId: req.userInfo.id, taskId, date: newDate, startTime: taskStartTime, endTime: taskEndTime, note})
        // save timesheet
        await newTimesheet.save() 
        res.status(200).json(ResponseMsg("AddSuccess", null, "Timesheet", false))
        
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({message: "Server Error", success: false})
    }
}

// update timesheet
module.exports.updateTimesheet=async(req, res)=>{
    const {taskId, date, startTime, endTime, note}=req.body
    // const error=[]
    // check taskId
    if(!taskId) return res.json({message: "TaskId is a compulsory field", success: false})
    else if(taskId&&!mongoose.Types.ObjectId.isValid(taskId)) return res.json({message: "Invalid TaskId", success: false})
    // chek date
    if(!date) return res.json({message: "Date is a compulsory field", success: false})
    // check startTime
    if(!startTime) return res.json({message: "StartTime is a compulsory field", success: false})
    // check endTime
    if(!endTime) return res.json({message: "EndTime is a compulsory field", success: false})

    try {
        // check id in url
        if(!mongoose.Types.ObjectId.isValid(req.params.timesheet_id)) return res.status(400).json(ResponseMsg("IDInvalid", null, null, false))
        // check existing timesheet in database
        const existingTimesheet=await timeSheetModel.findById({_id: req.params.timesheet_id})
        if(!existingTimesheet) return res.status(404).json(ResponseMsg("DataIDNotFound", null, "Timesheet", false))
        // check existing task in database
        const existingTask=await taskModel.findById({_id: taskId})
        if(!existingTask) return res.status(404).json(ResponseMsg("DataIDNotFound", null, "Task", false))
        // convert input dd-mm-yyyy to output mm-dd-yyyy format
        const newDate = convertDate(date)
        // check if future date
        const currentDate = new Date()
        if(newDate.toLocaleDateString() > currentDate.toLocaleDateString()) return res.status(404).json(ResponseMsg("FieldInvalid", "Date", null, false))
        // task start and end time conversion
        const taskStartTime = convertTime(startTime, newDate)
        const taskEndTime = convertTime(endTime, newDate)
        // check time validity
        if(checkTimeValidity(taskStartTime, taskEndTime)) return res.status(404).json(ResponseMsg("InvalidTime", null, null, false))
        // check time collision
        const sameDateTimesheet = await timeSheetModel.find({date: newDate, employeeId: req.userInfo.id})
        if(sameDateTimesheet.length>0){
            let sameData=false
            sameDateTimesheet.map(timesheet=>{
                if(checkTimeCollision(taskStartTime, timesheet.startTime, timesheet.endTime)) sameData=true 
                if(checkTimeCollision(taskEndTime, timesheet.startTime, timesheet.endTime)) sameData=true 
            })
            if(sameData) return res.status(404).json(ResponseMsg("TimeCollision", null, "Timesheet", false))
        }
        // update timesheet
        console.log(newDate)
        const updateTimesheet=await timeSheetModel.findByIdAndUpdate({_id: req.params.timesheet_id}, {taskId, date: newDate, startTime: taskStartTime, endTime: taskEndTime, note})
        // save timesheet
        await updateTimesheet.save() 
        res.status(200).json(ResponseMsg("UpdateSuccess", null, "Timesheet", false))

    } catch (err) {
        console.error(err.message)
        // console.log(err)
        return res.status(500).json({message: "Server Error", success: false})
    }
}

// delete timesheet
module.exports.deleteTimesheet=async(req, res)=>{
    try {
        // check param id
        if(!mongoose.Types.ObjectId.isValid(req.params.timesheet_id)) return res.status(404).json({message: "Invalid Timesheet Id", success: false})
        // check existing timehseet
        const existingTimesheet = await timeSheetModel.findByIdAndRemove(req.params.timesheet_id)
        if(!existingTimesheet) return res.status(404).json(ResponseMsg("DataNotFound", null, "Timesheet", false))
        return res.status(200).json(ResponseMsg("DeleteSuccess", null, "Timesheet", false))
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({message: "Server Error", success: false})
    }
}