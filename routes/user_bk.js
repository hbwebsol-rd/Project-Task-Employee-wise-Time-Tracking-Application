const router=require('express').Router()
const {check, validationResult}=require('express-validator')
const userModel=require('../models/users.model')
const employeeModel=require('../models/employee.model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('config')
const superUser=require('../middleware/superUser.middleware')
const reset=require('../middleware/reset.middleware')
const nodemailer=require('nodemailer')
const { default: mongoose } = require('mongoose')
const mailTemplate=require('../mail_template/mail_template')

// Get Data of all superUsers
router.get('/getUsers', superUser, async(req, res)=>{
    try {
        // filters
        const {page=1, limit=10, sort}=req.query
        const search=req.query.search||""
        const nsort=sort==="desc"?-1:1
        const pipeline=[
            {$sort: {taskName: nsort}},
            {$match: { $or: [ {name: {$regex: search, $options: "i"}}, 
                              {email: {$regex: search, $options: "i"}}]}},
            {$skip: (page-1)*parseInt(limit)},
            {$limit: parseInt(limit)},
        ]
        // find existing users
        const existingUsers=await userModel.aggregate(pipeline)
        if(!existingUsers.length>0) return res.status(404).json({message: 'No tasks found', success: false})
        // display all users
        res.status(200).json({success: true, data: existingUsers.map(data=>data)})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// Get Data of a single superUser
router.get('/getUser/:user_id', superUser, async(req, res)=>{
    try {
        // check if userId is correct
        if(!mongoose.Types.ObjectId.isValid(req.params.user_id)) return res.status(404).json({message: 'Invalid User Id', success: false})
        // check existing user exists
        const existingUser=await userModel.findById(req.params.user_id)
        if(!existingUser) return res.status(404).json({message: 'No User Found', success: false})
        // display user profile
        res.status(200).json({succes: true, data: existingUser})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// Login super user & employee
router.post('/login', [
    check('role'), check('email'), check('password'),
], async(req, res)=>{
    const {role, email, password}=req.body
    const errors=[]
    // check role
    if(!role) errors.push("role is required")
    else if(role&&typeof role === 'string') errors.push("role must be a number") 
    else if(role<1||role>2) errors.push("role must be 1 or 2") 
    if(role===0) errors.pop()
    // check email
    if(!email) errors.push("email is required") 
    else if(email&&!email.includes('@')||!email.endsWith('.com')) errors.push("Invalid Email Id") 
    // check password
    if(!password) errors.push("password is required") 
    else if(password&&password.length<8) errors.push("Invalid password")
    // display errors
    if(errors.length>0) return res.status(400).json({errors: errors, success: false})

    try {
        // check existing user
        if(role===1){
            existingUser=await userModel.findOne({email})
            if(!existingUser) return res.status(400).json({message: 'Invalid Credentials', success: false})
        }else if(role===2){
            existingUser=await employeeModel.findOne({email})
            if(!existingUser) return res.status(400).json({message: 'Invalid Credentials', success: false})
        }else return res.status(400).json({message: 'Invalid Role ID', success: false})
        const isMatch=await bcrypt.compare(password, existingUser.password)
        if(!isMatch) return res.status(400).json({message: 'Invalid Credentials', success: false})
        // payload for jwt and signature
        const payload={
            userInfo: {
                id: existingUser.id,
                name: existingUser.name,
                role: existingUser.role
            }
        }
        jwt.sign(payload, config.get('jwtToken'), {expiresIn: 360000}, (err, token)=>{
            if(err) throw err
            res.status(200).json({token})
        })
    
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// forgot password-employee/admin
router.post('/login/forgotPassword', [
    check('email')
], async(req, res)=>{
    const {email}=req.body
    const errors=[]
    // check email
    if(!email) errors.push("email is required") 
    else if(email&&!email.includes('@')||!email.endsWith('.com')) errors.push("Invalid Email Id")
    // display errors
    if(errors.length>0) return res.status(400).json({errors: errors, success: false})

    try {
        // check existing mail-employee/admin
        const existingEmail=await employeeModel.findOne({email})||await userModel.findOne({email})
        if(!existingEmail) return res.status(200).json({message: 'Email not found', success: false})
        // token creation
        const payload={
            userInfo: {
                id: existingEmail._id,
                role: existingEmail.role
            }
        }
        jwt.sign(payload, config.get('jwtToken'), {expiresIn: 36000}, (err, token)=>{
            if(err) throw err
            // send mail using nodemailer
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
            // mail contents
            const mailOptions={
                from: `${config.get('superUserm')}`,
                to: `${existingEmail.email}`,
                subject: 'Forget Password!',
                html: mailTemplate.forgotPassword(existingEmail.email)
            }
            // send mail
            transporter.sendMail(mailOptions, (err, info)=>{
                if(err) throw err
                res.status(200).json({Info: info.response})
            })
            res.status(200).json({token})
        })
        
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// reset password-employee/admin
router.patch('/profile/resetPassword', [reset, [
    check('password'), check('confirmPassword')
]], async(req, res)=>{
    const {password, confirmPassword}=req.body
    const errors=[]
    // check password
    if(!password) errors.push("Password is required") 
    else if(password&&password.length<8) errors.push("Invalid password")
    // check password
    if(!confirmPassword) errors.push("Password Confirmation is required") 
    else if(confirmPassword&&confirmPassword.length<8) errors.push("Invalid password")
    // display errors
    if(errors.length>0) return res.status(400).json({errors: errors, success: false})

    try {
        // check existing user
        if(req.userInfo.role===1){
            existingUser=await userModel.findById({_id: req.userInfo.id})
            if(!existingUser) return res.status(400).json({message: 'Invalid Credentials', success: false})
        }else if(req.userInfo.role===2){
            existingUser=await employeeModel.findById({_id: req.userInfo.id})
            if(!existingUser) return res.status(400).json({message: 'Invalid Credentials', success: false})
        }else return res.status(400).json({message: 'Invalid Role ID', success: false})
        // check password
        if(password!==confirmPassword) return res.status(400).json({message: 'Password does not match', success: false}) 
        // reset employee password
        if(req.userInfo.role===1) resetPassword=await userModel.findByIdAndUpdate({_id: req.userInfo.id}, {...req.body})
        else if(req.userInfo.role===2) resetPassword=await employeeModel.findByIdAndUpdate({_id: req.userInfo.id}, {...req.body})
        // hash password
        const salt=await bcrypt.genSalt(10)
        resetPassword.password=await bcrypt.hash(password, salt)
        // save password
        await resetPassword.save()
        // send mail using nodemailer
        const transporter=nodemailer.createTransport({
            service: 'smpt@gmail.com',
            port: 465,
            secure: true,
            requireTLS: true,
            auth: {
                user: `${config.get('superUserm')}`,
                pass: `${config.get('superUserp')}`
            }
        })
        // send mail contents
        const mailOptions={
            from: `${config.get('superUserm')}`,
            to: `${existingUser.email}`,
            subject: `Reset Password!`,
            html: `<p>Your password has been reset<br></p>
                    <hr>
                    <p>Your request of password for account:<br>${existingUser.email} has been met.</p>
                    <h4 style="color: #82b0fd;">Re-login with new password at: http://localhost:3002/api/login</h4>
                    <hr>`
        }
        // send mail
        transporter.sendMail(mailOptions, (err, info)=>{
            if(err) throw err
            res.status(200).json({Info: info.response})
        })
        res.status(200).json({message: 'Password updated successfully', success: true}) 

    } catch (err) {
        console.err(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// Update super user profile
router.patch('/profile/updateProfile', [superUser, [
    check('email'), check('phoneNumber')
]], async(req, res)=>{
    const {email, phoneNumber}=req.body
    const errors=[]
    // check email
    if(!email) errors.push("email is required") 
    else if(email&&!email.includes('@')||!email.endsWith('.com')) errors.push("Invalid Email Id")
    // check phonenumber
    if(!phoneNumber) errors.push("phoneNumber is required") 
    else if(phoneNumber&&phoneNumber.toString().length<10) errors.push("Phone Number must be of 10-digits") 
    // display errors
    if(errors.length>0) return res.status(400).json({errors: errors, success: false})

    try {
        // check existing user
        const existingUser=await userModel.findById({_id: req.userInfo.id})
        if(!existingUser) return res.status(500).json({message: 'User not found', success: false})
        // check email
        const existingUserEmail=await userModel.findOne({email})
        if(existingUserEmail) if(existingUser.id!==existingUserEmail.id) return res.status(400).json({message: 'User with same Email Id exists', success: false})
        // check phoneNumber
        const existingUserPhoneNumber=await userModel.findOne({phoneNumber})
        if(existingUserPhoneNumber) if(existingUser.id!==existingUserPhoneNumber.id) return res.status(400).json({message: 'User with same Phone Number exists', success: false})
        // update superuser details
        const updateUser=await userModel.findByIdAndUpdate({_id: req.userInfo.id}, {...req.body})
        // save superuser update
        await updateUser.save()
        res.status(200).json({message: 'User profile updated successfully', success: true})
        
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

// Update super user password
router.patch('/profile/updatePassword', [superUser, [
    check('oldPassword', 'Old password required').isLength({min: 8}),
    check('password', 'New pasword required').isLength({min: 8}),
    check('confirmPassword', 'Please confirm password').isLength({min: 8})
]], async(req, res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array().map(error=>error.msg), success: false})

    const {oldPassword, password, confirmPassword}=req.body
    try {
        // check existing user
        const existingUser=await userModel.findById({_id: req.userInfo.id})
        if(!existingUser) return res.status(500).json({message: 'User not found', success: false})
        // password updation of superuser
        const isMatch=await bcrypt.compare(oldPassword, existingUser.password)
        if(!isMatch) return res.status(400).json({message: 'Old password incorrect', success: false}) 
        if(password===oldPassword) return res.status(400).json({message: 'New password cannot be same as old password', success: false}) 
        if(password!==confirmPassword) return res.status(400).json({message: 'Password does not match', success: false}) 
        // update superuser details
        const updateUser=await userModel.findByIdAndUpdate({_id: req.userInfo.id}, {...req.body})
        // password hash
        const salt=await bcrypt.genSalt(10)
        updateUser.password=await bcrypt.hash(password, salt)
        // save superuser update
        await updateUser.save()
        res.status(200).json({message: 'User password updated successfully', success: true})
        
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'Server Error', success: false})
    }
})

module.exports = router