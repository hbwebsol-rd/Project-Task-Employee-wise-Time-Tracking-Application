const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const userModel=mongoose.model('user', userSchema)
module.exports=userModel