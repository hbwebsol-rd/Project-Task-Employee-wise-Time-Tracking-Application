const {check}=require('express-validator')
const User=require('../controllers/user.controller')
const Auth=require('../middleware/auth.middleware')

module.exports=(app)=>{

    // Get Data of all superUsers
    app.get('/api/getUsers', Auth.superUser, User.getUsers)

    // display superUser details
    app.get('/api/user/profile', Auth.superUser, User.getUserProfile)

    // Get Data of a single superUser
    app.get('/api/getUser/:user_id', Auth.superUser, User.getUser)

    // User/Employee login
    app.post('/api/user/login', [check('role'), check('email'), check('password')], User.loginUser)

    // User/Employee forgot password
    app.post('/api/user/login/forgotPassword', [check('email')], User.forgotPassword)

    // User/Employee reset password
    app.patch('/api/user/login/resetPassword', [Auth.resetPassword, [check('password'), check('confirmPassword')]], User.resetPassword)
    
    // User update profile
    app.patch('/api/user/updateProfile', [Auth.superUser, [check('email'), check('phoneNumber')]], User.updateProfile)
    
    // User update password
    app.patch('/api/user/updatePassword', [Auth.superUser, [check('oldPassword'), check('password'), check('confirmPassword')]], User.updatePassword)
    
}

