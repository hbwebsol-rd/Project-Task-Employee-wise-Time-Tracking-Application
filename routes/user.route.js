const {check}=require('express-validator')
const User=require('../controllers/user.controller')
const Auth=require('../middleware/auth.middleware')

module.exports=(app)=>{

    // superUser dashboard
    app.get('/api/user/dashboard', Auth.superUser, User.getDashBoard)

    // Get Data of all superUsers
    app.get('/api/getUsers', Auth.superUser, User.getUsers)

    // display superUser details
    app.get('/api/user/profile', Auth.superUser, User.getUserProfile)

    // Get Data of a single superUser
    app.get('/api/getUser/:user_id', Auth.superUser, User.getUser)

    // Login superuser/employee
    app.post('/api/user/login', [check('email').isEmail(), check('password').isLength({min: 8})], User.loginUser)

    // User/Employee forgot password
    app.post('/api/user/login/forgotPassword', [check('email').isEmail()], User.forgotPassword)

    // User/Employee reset password
    app.patch('/api/user/login/resetPassword', [Auth.resetPassword, [check('password').isLength({min: 8}), check('confirmPassword').isLength({min: 8})]], User.resetPassword)
    
    // User update profile
    app.patch('/api/user/updateProfile', [Auth.superUser, [check('email').isEmail(), check('phoneNumber').isEmpty().isNumeric().isLength({min: 8})]], User.updateProfile)
    
    // User update password
    app.patch('/api/user/updatePassword', [Auth.superUser, [check('oldPassword').isLength({min: 8}), check('password').isLength({min: 8}), check('confirmPassword').isLength({min: 8})]], User.updatePassword)
    
}

