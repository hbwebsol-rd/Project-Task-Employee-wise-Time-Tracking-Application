const router=require('express').Router()
const {check}=require('express-validator')
const userModel=require('../models/users.model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('config')

// Register super user
router.post('/', [ 
    check('name'), check('role'), check('email'), check('password'), check('phoneNumber'),
], async(req, res)=>{
    const {name, role, email, password, phoneNumber}=req.body
    const errors=[]
    // check name
    if(!name) errors.push("name is required") 
    // check role
    if(!role) errors.push("role is required")
    else if(role&&typeof role === 'string') errors.push("role must be a number") 
    else if(role<1||role>1) errors.push("role must be 1") 
    if(role===0) errors.pop()
    // check email
    if(!email) errors.push("email is required") 
    else if(email&&!email.includes('@')||!email.endsWith('.com')) errors.push("Invalid Email Id") 
    // check password
    if(!password) errors.push("password is required") 
    else if(password&&password.length<8) errors.push("Invalid password")
    // check phonenumber
    if(!phoneNumber) errors.push("phoneNumber is required") 
    else if(phoneNumber&&(phoneNumber.toString().length<10||phoneNumber.toString().length>10)) errors.push("Phone Number must be of 10-digits") 
    // display errors
    if(errors.length>0) return res.status(400).json({errors: errors, success: false})

    try {
        // find existing user
        const existingUser=await userModel.findOne({email})
        if(existingUser) return res.status(400).json({message: 'User already Registered', success: false})
        // create new user
        const newUser=new userModel({name, role, email, password, phoneNumber})
        // password hash
        const salt=await bcrypt.genSalt(10)
        newUser.password=await bcrypt.hash(password, salt)
        // save new user
        await newUser.save()
        // payload for jwt and signature
        const payload={
            userInfo: {
                id: newUser.id,
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

// const info=employeeModel.find({name: 'taha'})

// async function timeOut(data){
//     data=await info
//     setTimeout(() => {
//         if(data===null) return console.log('server timeout')
//         return console.log(data.map(data=>data))
//     }, 5000);
// }
// timeOut(info)

module.exports = router