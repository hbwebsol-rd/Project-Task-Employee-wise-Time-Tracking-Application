const Auth=require('../middleware/auth.middleware')
const Timesheet=require('../controllers/timesheet.controller')
const { check } = require('express-validator')

module.exports=(app)=>{

    // get all timesheets
    app.get('/api/getTimesheets', Auth.multiAccess, Timesheet.getTimesheets)

    // get today timesheets
    app.get('/api/getTodayTimesheets', Auth.multiAccess, Timesheet.getTodayTimesheets)

    // get yesterday timesheets
    app.get('/api/getYesterdayTimesheets', Auth.multiAccess, Timesheet.getYesterdayTimesheets)

    // get custom date timesheets
    app.post('/api/getCustomTimesheets', [Auth.multiAccess, [check('startDate'), check('endDate')]], Timesheet.getCustomTimesheets)

    // create timesheet
    app.post('/api/addTimesheet', [Auth.employee, [check('taskId'), check('date'), check('startTime'), check('endTime')]], Timesheet.createTimesheet)

    // update timesheet
    // app.get('/api/updateTimesheet/:timesheet_id', [Auth.employee, [check('employeeId'), check('taskId'), check('date'), check('startTime'), check('endTime')]], Timesheet.updateTimesheet)

    // delete timesheet
    app.delete('/api/deleteTimesheet/:timesheet_id', Auth.multiAccess, Timesheet.deleteTimesheet)

}