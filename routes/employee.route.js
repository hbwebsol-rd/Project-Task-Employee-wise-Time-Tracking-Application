const {check}=require('express-validator')
const Auth=require('../middleware/auth.middleware')
const Employee=require('../controllers/employee.controller')

module.exports=(app)=>{

    // get data of all employees by superuser
    app.get('/api/getEmployees', Auth.superUser, Employee.getEmployees) 

    // display current employee details by employee
    app.get('/api/employee/profile', Auth.employee, Employee.getEmployeeProfile)

    // display current employee tasks by employee
    app.get('/api/employee/tasks', Auth.employee, Employee.getEmployeeTasks)

    // get data of a single employee by superuser
    app.get('/api/getEmployee/:employee_id', Auth.superUser, Employee.getEmployee)

    // create new employee by superuser
    app.post('/api/addEmployee', [Auth.superUser, [check('name'), check('email'), check('password'), check('designation')]], Employee.createEmployee)

    // add total time on task by employee
    app.patch('/api/employee/task/addTotalTime/:task_id', [Auth.employee, [check('from'), check('to')]], Employee.addTotalTime)

    // update status of task by employee
    app.patch('/api/employee/task/updateStatus/:task_id', [Auth.employee, [check('status')]], Employee.updateTaskStatus)

    // update employee by superuser
    app.patch('/api/updateEmployee/:employee_id', [Auth.superUser, [check('name'), check('email'), check('designation')]], Employee.updateEmployee)

    // update employee profile details by employee
    // app.patch('/api/employee/updateProfile', [Auth.employee, [check('name'), check('email'), check('designation')]], Employee.employeeUpdateProfile)
    
    // update employee profile password by employee
    app.patch('/api/employee/updatePassword', [Auth.employee, [check('oldPassword'), check('password'), check('confirmPassword')]], Employee.employeeUpdatePassword)

    // delete employee by superuser
    app.delete('/api/deleteEmployee/:employee_id', Auth.superUser, Employee.deleteEmployee)

}

