const mongoose=require('mongoose')

const taskSchema=mongoose.Schema({
    projectName: {
        type: String,
        ref: 'project.model'
    },
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: 'project.model'
    },
    employeeName: {
        type: String,
        ref: 'employee.model'
    },
    employeeId: {
        type: mongoose.Types.ObjectId,
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
    totalTime: [{
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,
            required: true
        }
    }],
    timeOnTask: {
        type: Number,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
})

const taskModel=mongoose.model('task', taskSchema)
module.exports=taskModel