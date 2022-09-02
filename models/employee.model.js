const mongoose=require('mongoose')

const employeeSchema=mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const employeeModel=mongoose.model('employee', employeeSchema)
module.exports=employeeModel