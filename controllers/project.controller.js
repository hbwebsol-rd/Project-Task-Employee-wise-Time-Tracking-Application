const projectModel=require('../models/project.model')
const customerModel=require('../models/customer.model')
const mongoose=require('mongoose')

// retrieve data of all projects
module.exports.getProjects=async(req, res)=>{
    try {
        // filters
        const {page=1, limit=10, sort}=req.query
        const search=req.query.search||""
        const nsort=sort==="desc"?-1:1
        const pipeline=[
            {$sort: {name: nsort}},
            {$match: {$or: [{name: {$regex: search, $options: "i"}}, 
                            {technology: {$regex: search, $options: "i"}}, 
                            {customerName: {$regex: search, $options: "i"}} ]}},
            {$skip: (page-1)*parseInt(limit)},
            {$limit: parseInt(limit)},
        ]
        // check existing projects
        const existingProjects=await projectModel.aggregate(pipeline)
        if(!existingProjects.length>0) return res.status(200).json({message: 'No projects found', success: false})
        // display all projects
        res.status(200).json({success: true, data: existingProjects.map(data=>data)})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
}

// retrieve data of a single project
module.exports.getProject=async(req, res)=>{
    try {
        // check url project id
        if(!mongoose.Types.ObjectId.isValid(req.params.project_id)) return res.status(400).json({message: 'Invalid Project Id', success: false})
        // check existing project
        const existingProject=await projectModel.findById(req.params.project_id)
        if(!existingProject) return res.status(200).json({message: 'No project found', success: false})
        // display project
        res.status(200).json({success: true, data: existingProject})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
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
        // check existing project
        const existingProject=await projectModel.findOne({name})
        if(existingProject) return res.status(200).json({message: 'Project already exists', success: false})
        // customer exists in customer database
        const cId=await customerModel.findById({_id: customerId})
        if(!cId) return res.status(400).json({message: "No such customer found", success: false})
        // create new project
        const newProject=await projectModel({name, customerName: cId.name, technology, start, end})
        // save new project
        await newProject.save()
        res.status(200).json({message: 'Project added successfully', success: true})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
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
        if(!mongoose.Types.ObjectId.isValid(req.params.project_id)) return res.status(400).json({message: 'Invalid Project Id', success: false})
        // check existing project
        const existingProject=await projectModel.findById(req.params.project_id)
        if(!existingProject) return res.status(200).json({message: 'No project found', success: false})
        // check existing customer
        const existingCustomer=await customerModel.findById({_id: customerId})
        if(!existingCustomer) return res.status(200).json({message: 'No customer found', success: false})
        // update project details
        const projectFields={customerName: existingCustomer.name}
        const updateProject=await projectModel.findByIdAndUpdate({_id: req.params.project_id}, {$set: projectFields, ...req.body})
        // save project details
        await updateProject.save()
        res.status(200).json({message: 'Project updated successfully', success: true})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
}

// delete proeject info
module.exports.deleteProject=async(req, res)=>{
    try {
        // check url project id
        if(!mongoose.Types.ObjectId.isValid(req.params.project_id)) return res.status(400).json({message: 'Invalid Project Id', success: false})
        // check existing project and remove
        const existingProject=await projectModel.findByIdAndRemove(req.params.project_id)
        if(!existingProject) return res.status(200).json({message: 'No project found', success: false})
        res.status(200).json({message: 'Project Removed Successfully', success: true})
        
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
}