const router=require('express').Router()
const {check, validationResult}=require('express-validator')
const userModel=require('../models/users.model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('config')

// post request for register
router.post('/', [
    check('name', 'Please provide a name').not().isEmpty(),
    check('role', 'Please provide your role').isNumeric(),
    check('email', 'Please provide an email').isEmail(),
    check('phoneNumber', 'Please provide a Phone no.').isNumeric(),
    check('password', 'Please provide a password').isLength({min: 8})
], async(req, res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    const {name, role, email, password, phoneNumber}=req.body
 
    try {
        const user=await userModel.findOne({email})
        if(user) return res.status(200).json({message: 'User already Registered', success: false})
        newUser=new userModel({name, role, email, password, phoneNumber})

        const salt=await bcrypt.genSalt(10)
        newUser.password=await bcrypt.hash(password, salt)
        await newUser.save()

        const payload={
            userInfo: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
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