const {check}=require('express-validator')
const Auth=require('../middleware/auth.middleware')
const Project=require('../controllers/project.controller')

module.exports=(app)=>{

    // get data of all projects
    app.get('/api/getProjects', Auth.superUser, Project.getProjects)

    // get data of a single project
    app.get('/api/getProject/:project_id', Auth.superUser, Project.getProject)

    // create new project
    app.post('/api/addProject', [Auth.superUser, [check('name'), check('customerId'), check('technology'), check('start'), check('end')]], Project.createProject)

    // update project info
    app.patch('/api/updateProject/:project_id', [Auth.superUser, [check('name'), check('customerId'), check('technology'), check('start'), check('end')]], Project.updateProject)

    // delete project
    app.delete('/api/deleteProject/:project_id', Auth.superUser, Project.deleteProject)

}
