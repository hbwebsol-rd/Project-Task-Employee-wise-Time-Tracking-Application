const mongoose=require('mongoose')

const projectSchema=mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    customerName: {
        type: String,
        ref: 'customer.model'
    },
    customerId: {
        type: mongoose.Types.ObjectId,
        ref: 'customer.model'
    },
    technology: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
})

const projectModel=mongoose.model('project', projectSchema)
module.exports=projectModel