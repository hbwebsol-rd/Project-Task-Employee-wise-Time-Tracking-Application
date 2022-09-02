const router=require('express').Router()
const {check, validationResult}=require('express-validator')
const projectModel=require('../models/project.model')
const superUser=require('../middleware/superUser.middleware')
const config=require('config')
const mongoose=require('mongoose')

// get request for all projects
router.get('/', superUser, async(req, res)=>{
    try {
        const projects=await projectModel.find()
        if(!projects) return res.status(200).json({message: 'No projects found', success: false})
        res.status(200).json(projects)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// get request for a single project 
router.get('/:project_id', superUser, async(req, res)=>{
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.project_id)) return res.status(400).json({message: 'Invalid Id', success: false})
        const project=await projectModel.findById(req.params.project_id)
        if(!project) return res.status(200).json({message: 'No project found', success: false})
        res.status(200).json(project)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// post request for creating a client project
router.post('/', [superUser, [
    check('name', 'Please provide Project name').not().isEmpty(),
    check('customerName', 'Please provide Clients name').not().isEmpty(),
    check('technology', 'Please provide Technology used').not().isEmpty(),
    check('start', 'Please provide a starting date').not().isEmpty(),
    check('end', 'Please provide an ending date').not().isEmpty()
]], async(req, res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    const {name, customerName, technology, start, end}=req.body
    
    try {
        const project=await projectModel.findOne({name})
        if(project) return res.status(200).json({message: 'Project already exists', success: false})
        const newProject=await projectModel({name, customerName, technology, start, end})
        await newProject.save()
        res.status(200).json({message: 'Project added successfully', success: true})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }

})

// put request for creating a client project
router.put('/update/:project_id', [superUser, [
    check('name', 'Please provide Project name').not().isEmpty(),
    check('customerName', 'Please provide Clients name').not().isEmpty(),
    check('technology', 'Please provide Technology used').not().isEmpty(),
    check('start', 'Please provide a starting date').not().isEmpty(),
    check('end', 'Please provide an ending date').not().isEmpty()
]], async(req, res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.project_id)) return res.status(400).json({message: 'Invalid Id', success: false})
        let project=await projectModel.findById(req.params.project_id)
        if(!project) return res.status(200).json({message: 'No project found', success: false})
        const updateProject=await projectModel.findByIdAndUpdate({_id: req.params.project_id}, {...req.body})
        await updateProject.save()
        res.status(200).json({message: 'Project updated successfully', success: true})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }

})

// delete request for deleting a project
router.delete('/:project_id', superUser, async(req, res)=>{
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.project_id)) return res.status(400).json({message: 'Invalid Id', success: false})
        const project=await projectModel.findByIdAndRemove(req.params.project_id)
        if(!project) return res.status(200).json({message: 'No project found', success: false})
        res.status(200).json({message: 'Project removed successfully', success: true})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

module.exports=router