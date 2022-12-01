const mongoose=require('mongoose')
const customerModel=require('../models/customer.model')
const {ResponseMsg} = require('../config/helpers')

// retrieve info of all customers
module.exports.getCustomers=async(req ,res)=>{
    try {
        // filters
        const {page=1, limit=1000, sort}=req.query
        const search=req.query.search||""
        const nsort=sort==="ascending"?1:-1
        const pipeline=[
            {$sort: {created_date: nsort}},
            {$match: {$or: [{name: {$regex: search, $options: "i"}}, {email: {$regex: search, $options: "i"}}]}},
            {$skip: (page-1)*parseInt(limit)},
            {$limit: parseInt(limit)},
        ]
        // check existing customers and pagination
        const existingCustomers=await customerModel.aggregate(pipeline)
        if(!existingCustomers.length>0) return res.status(404).json(ResponseMsg("DataNotFound", "", "Customers", false))
        // display all customers
        res.status(200).json({success: true, total: existingCustomers.length, data: existingCustomers.map(data=>data)})

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}

// retrieve info of a single customer
module.exports.getCustomer=async(req, res)=>{
    try {
        // check url customer id
        if(!mongoose.Types.ObjectId.isValid(req.params.customer_id)) return res.status(400).json(ResponseMsg("FieldInvalid", "CustomerID", "", false))
        // check existing customer
        const existingCustomer=await customerModel.findById(req.params.customer_id)
        if(!existingCustomer) return res.status(404).json(ResponseMsg("DataNotFound", "", "Customer", false))
        // display customer details
        res.status(200).json({success: true, data: existingCustomer})

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}

// create new customer
module.exports.createCustomer=async(req, res)=>{
    const {gender, name}=req.body
    let {email}=req.body
    const errors=[]
    // check name
    if(!name) errors.push("name is required")
    // check gender
    if(!gender) errors.push("gender is required") 
    // check email
    if(!email) errors.push("email is required") 
    else if(email&&!email.includes('@')||!email.endsWith('.com')) errors.push("Invalid Email Id") 
    // display errors
    if(errors.length>0) return res.status(400).json({errors: errors, success: false})

    try {
        email=email.toLowerCase()
        // check existing employee
        const existingCustomer=await customerModel.findOne({email})
        if(existingCustomer) return res.status(404).json(ResponseMsg("DataExists", "", "Customer", false))
        // create new customer
        const newCustomer=await customerModel({name, gender, email})
        // save customer
        await newCustomer.save()
        res.status(200).json(ResponseMsg("AddSuccess", "", "Customer", true))

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}

// update customer info
module.exports.updateCustomer=async(req, res)=>{
    const {gender, name}=req.body
    let {email}=req.body
    const errors=[]
    // check name
    if(!name) errors.push("name is required")
    // check gender
    if(!gender) errors.push("gender is required") 
    // check email
    if(!email) errors.push("email is required") 
    else if(email&&!email.includes('@')||!email.endsWith('.com')) errors.push("Invalid Email Id") 
    // display errors
    if(errors.length>0) return res.status(400).json({errors: errors, success: false})

    try {
        email=email.toLowerCase()
        // check url customer di
        if(!mongoose.Types.ObjectId.isValid(req.params.customer_id)) return res.status(400).json(ResponseMsg("FieldInvalid", "CustomerID", "", false))
        // check existing customer
        const existingCustomer=await customerModel.findById(req.params.customer_id)
        if(!existingCustomer) return res.status(404).json(ResponseMsg("DataNotFound", "", "Customer", false))
        // check email
        const existingCustomerEmail=await customerModel.findOne({email})
        if(existingCustomerEmail) if(existingCustomer.id!==existingCustomerEmail.id) return res.status(400).json(ResponseMsg("DataWithFieldExists", "EmailID", "Customer", false))
        // update customer details
        const updateCustomer=await customerModel.findByIdAndUpdate({_id: req.params.customer_id}, {...req.body})
        // save customer details
        await updateCustomer.save()
        res.status(200).json(ResponseMsg("UpdateSuccss", "", "Customer", true))

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}

// delete customer
module.exports.deleteCustomer=async(req, res)=>{
    try {
        // check url customer id
        if(!mongoose.Types.ObjectId.isValid(req.params.customer_id)) return res.status(400).json(ResponseMsg("FieldInvalid", "CustomerID", "", false))
        // check existing customer and remove
        const existingCustomer=await customerModel.findByIdAndRemove(req.params.customer_id)
        if(!existingCustomer) return res.status(404).json(ResponseMsg("DataNotFound", "", "Customer", true))
        res.status(200).json(ResponseMsg("DeleteSuccess", "", "Customer", true))

    } catch (err) {
        console.error(err.message)
        res.status(500).json(ResponseMsg("ServerError", "", "", false))
    }
}