const projectModel=require('../models/project.model')
const customerModel=require('../models/customer.model')
const mongoose=require('mongoose')
const { ResponseMsg } = require('../config/helpers')

// retrieve data of all projects
module.exports.getProjects=async(req, res)=>{
    try {
        // filters
        const {page=1, limit=1000, sort}=req.query
        const search=req.query.search||""
        const nsort=sort==="ascending"?1:-1
        const pipeline=[
            {$sort: {created_date: nsort}},
            {$lookup: {
                from: "customers",
                localField: "customerId",
                foreignField: "_id",
                as: "customerName"
            }},
            {$set: {customerName: {$arrayElemAt: ["$customerName.name", 0]}}},
            {$match: {$or: [{name: {$regex: search, $options: "i"}}, 
                            {technology: {$regex: search, $options: "i"}}, 
                            {customerName: {$regex: search, $options: "i"}} ]}},
            {$skip: (page-1)*parseInt(limit)},
            {$limit: parseInt(limit)},
        ]
        // check existing projects
        const existingProjects=await projectModel.aggregate(pipeline)
        if(!existingProjects.length>0) return res.status(404).json(ResponseMsg("DataNotFound", "", "Projects", false))
        // display all projects
        res.status(200).json({success: true, count: existingProjects.length, data: existingProjects.map(data=>data)})

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}

// retrieve data of a single project
module.exports.getProject=async(req, res)=>{
    try {
        // check url project id
        if(!mongoose.Types.ObjectId.isValid(req.params.project_id)) return res.status(400).json(ResponseMsg("FieldInvalid", "ProjectID", "", false))
        // check existing project
        const existingProject=await projectModel.findById(req.params.project_id)
        if(!existingProject) return res.status(404).json(ResponseMsg("DataNotFound", "", "Project", false))
        // display project
        res.status(200).json({success: true, data: existingProject})

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}

// create a new project
module.exports.createProject=async(req, res)=>{
    const {name, customerId, technology, start, end}=req.body
    const errors=[]
    // check name
    if(!name) errors.push("Name is required") 
    // check customerId
    if(!customerId) errors.push("CustomerId is required")
    else if(customerId&&!mongoose.Types.ObjectId.isValid(customerId)) errors.push("Enter a valid customerId")
    // check technology
    if(!technology) errors.push("Technology is required")
    // check start
    if(!start) errors.push("Start date is required")
    //  check end
    if(!end) errors.push("End date is required")
    // display errors
    if(errors.length>0) return res.status(400).json({errors: errors, success: false})

    try {
        // check if customer exists in customer database
        const existingCustomer=await customerModel.findById({_id: customerId})
        if(!existingCustomer) return res.status(400).json(ResponseMsg("DataNotFoundWithID", "", "Customer", false))
        // check existing project
        const existingProject=await projectModel.findOne({name})
        if(existingProject) return res.status(404).json(ResponseMsg("DataExists", "", "Project", false))
        // create new project
        const newProject=await projectModel({name, customerId, technology, start, end})
        // save new project
        await newProject.save()
        res.status(200).json(ResponseMsg("AddSuccess", "", "Project", true))

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}
 
// update proeject info
module.exports.updateProject=async(req, res)=>{
    const {name, customerId, technology, start, end}=req.body
    const errors=[]
    // check name
    if(!name) errors.push("Name is required") 
    // check customerId
    if(!customerId) errors.push("CustomerId is required")
    else if(customerId&&!mongoose.Types.ObjectId.isValid(customerId)) errors.push("Enter a valid customerId")
    // check technology
    if(!technology) errors.push("Technology is required")
    // check start
    if(!start) errors.push("Start date is required")
    //  check end
    if(!end) errors.push("End date is required")
    // display errors
    if(errors.length>0) return res.status(400).json({errors: errors, success: false})

    try {
        // check url project id
        if(!mongoose.Types.ObjectId.isValid(req.params.project_id)) return res.status(400).json(ResponseMsg("FieldInvalid", "ProjectID", "", false))
        // check existing project
        const existingProject=await projectModel.findById(req.params.project_id)
        if(!existingProject) return res.status(404).json(ResponseMsg("DataNotFoundWithID", "", "Project", false))
        // check existing customer
        const existingCustomer=await customerModel.findById({_id: customerId})
        if(!existingCustomer) return res.status(404).json(ResponseMsg("DataNotFoundWithID", "", "Customer", false))
        // check if project with same name exists
        let sameProject = await projectModel.find({name})
        sameProject = sameProject.filter(project=>{
            return project._id.toString() !== req.params.project_id.toString()
        })
        if(sameProject.length > 0) return res.status(404).json(ResponseMsg("DataExists", "", "Project", false))
        // update project details
        const updateProject=await projectModel.findByIdAndUpdate({_id: req.params.project_id}, {...req.body})
        // save project details
        await updateProject.save()
        res.status(200).json(ResponseMsg("UpdateSuccess", "", "Project", true))

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}

// delete project info
module.exports.deleteProject=async(req, res)=>{
    try {
        // check url project id
        if(!mongoose.Types.ObjectId.isValid(req.params.project_id)) return res.status(400).json(ResponseMsg("FieldInvalid", "ProjectID", "", false))
        // check existing project and remove
        const existingProject=await projectModel.findByIdAndRemove(req.params.project_id)
        if(!existingProject) return res.status(404).json(ResponseMsg("DataNotFound", "", "Project", false))
        res.status(200).json(ResponseMsg("DeleteSuccess", "", "Project", true))
        
    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}