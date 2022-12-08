const {check}=require('express-validator')
const Auth=require('../middleware/auth.middleware')
const Task=require('../controllers/task.controller')

// display all tasks
module.exports=(app)=>{

    // get data of all tasks
    app.get('/api/getTasks', Auth.multiAccess, Task.getTasks)

    // get data of a single task
    app.get('/api/getTask/:task_id', Auth.superUser, Task.getTask)

    // dropdown for task creation
    app.get('/api/taskDropdown', Auth.superUser, Task.addTaskDropdown)

    // create new task
    app.post('/api/addTask', [Auth.superUser, [check('taskName'), check('projectId'), check('employeeId'), check('priority'), check('status')]], Task.createTask)

    // update task details
    app.patch('/api/updateTask/:task_id', [Auth.superUser, [check('taskName'), check('projectId'), check('employeeId'), check('priority'), check('status')]], Task.updateTask)

    // delete task
    app.delete('/api/deleteTask/:task_id', Auth.superUser, Task.deleteTask)

}