const mongoose=require('mongoose')

const taskSchema=mongoose.Schema({
    projectId: {
        type: String,
        ref: 'project.model'
    },
    employeeId: {
        type: String,
        ref: 'employee.model'
    },
    taskName: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    status: { 
        type: String,
        required: true
    },
    timeOnTask: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const taskModel=mongoose.model('task', taskSchema)
module.exports=taskModel