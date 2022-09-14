const Auth=require('../middleware/auth.middleware')
const Export=require('../controllers/export.controller')

module.exports=(app)=>{
    
    // create xlsx file for company 
    app.get('/api/worklogSheet', Auth.superUser, Export.getExports)

}