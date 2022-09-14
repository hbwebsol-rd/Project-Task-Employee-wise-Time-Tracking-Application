const mongoose=require('mongoose')

const employeeSchema=mongoose.Schema({
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
    created_date: {
        type: Date,
        default: Date.now
    },
})

const employeeModel=mongoose.model('employee', employeeSchema)
module.exports=employeeModel