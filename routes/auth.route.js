const router=require('express').Router()
const {check, validationResult}=require('express-validator')
const userModel=require('../models/users.model')
const employeeModel=require('../models/employee.model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('config')

// post request for login
router.post('/user/login', [
    check('email', 'Please provide an email').isEmail(),
    check('password', 'Please provide a password').isLength({min: 8})
], async(req, res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    const {email, password}=req.body
    try {
        const existingUser=await userModel.findOne({email})||await employeeModel.findOne({email})
        if(!existingUser) return res.status(400).json({message: 'Invalid Credentials', success: false})
        const isMatch=await bcrypt.compare(password, existingUser.password)
        if(!isMatch) return res.status(400).json({message: 'Invalid Credentials', success: false})
        
        const payload={ 
            userInfo: {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
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

module.exports = router