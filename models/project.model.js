const mongoose=require('mongoose')

const projectSchema=mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    customerName: {
        type: String,
        required: true
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
    date: {
        type: Date,
        default: Date.now
    },
})

const projectModel=mongoose.model('project', projectSchema)
module.exports=projectModel