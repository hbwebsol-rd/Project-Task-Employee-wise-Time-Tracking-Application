const mongoose=require('mongoose')

const timeSheetSchema=mongoose.Schema({
    taskId: {
        type: mongoose.Types.ObjectId,
        ref: 'task.model',
    },
    employeeId: {
        type: mongoose.Types.ObjectId,
        ref: 'employee.model'
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    note: {
        type: String,
    },
    created_date: {
        type: Date,
        default: Date.now
    },
})

const timeSheetModel=mongoose.model('timeSheet', timeSheetSchema)
module.exports=timeSheetModel