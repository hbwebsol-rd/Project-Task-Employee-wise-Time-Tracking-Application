const router=require('express').Router()
const {check, validationResult}=require('express-validator')
const customerModel = require('../models/customer.model')
const superUser=require('../middleware/superUser.middleware')
const mongoose = require('mongoose')

// get request for all customers
router.get('/', superUser, async(req, res)=>{
    try {
        const customers=await customerModel.find()
        if(!customers) return res.status(200).json({message: 'No customers found', success: false})
        res.status(200).json(customers)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// get request for a single customers
router.get('/:customer_id', superUser, async(req, res)=>{
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.customer_id)) return res.status(400).json({message: 'Invalid Id', success: false})
        const customer=await customerModel.findById(req.params.customer_id)
        if(!customer) return res.status(200).json({message: 'No customer found', success: false})
        res.status(200).json(customer)
    } catch (err) { 
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// post request to add a customers detail
router.post('/', [superUser, [
    check('name', 'Please provide a Name').not().isEmpty(),
    check('email', 'Please provide an Email').isEmail()
]], async (req, res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    const {name, email}=req.body

    try {
        const customer=await customerModel.findOne({email})
        if(customer) return res.status(200).json({message: 'Customer already exists', success: false})

        const newCustomer=await customerModel({name, email})
        await newCustomer.save()
        res.status(200).json({message: 'Customer added successfully', success: true})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// put request to update a customers detail
router.put('/update/:customer_id', [superUser, [
    check('name', 'Please provide a Name').not().isEmpty(),
    check('email', 'Please provide an Email').isEmail()
]], async (req, res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.customer_id)) return res.status(400).json({message: 'Invalid Id', success: false})
        const customer=await customerModel.findById(req.params.customer_id)
        if(!customer) return res.status(200).json({message: 'No customer found', success: false})

        const updateCustomer=await customerModel.findByIdAndUpdate({_id: req.params.customer_id}, {...req.body})
        await updateCustomer.save()
        res.status(200).json({message: 'Customer updated successfully', success: true})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// get request for a single customers
router.delete('/delete/:customer_id', superUser, async(req, res)=>{
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.customer_id)) return res.status(400).json({message: 'Invalid Id', success: false})
        const customer=await customerModel.findByIdAndRemove(req.params.customer_id)
        if(!customer) return res.status(200).json({message: 'No customer found', success: false})
        res.status(200).json({message: 'Customer info removed successfully', success: true})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

module.exports=router