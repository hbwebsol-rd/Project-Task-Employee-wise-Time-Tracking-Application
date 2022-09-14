const mongoose=require('mongoose')
const customerSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})

const customerModel=mongoose.model('customer', customerSchema)
module.exports=customerModel