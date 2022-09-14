const {check}=require('express-validator')
const Auth=require('../middleware/auth.middleware')
const Customer=require('../controllers/customer.controller')

module.exports=(app)=>{

    // Get Data of all customer
    app.get('/api/getCustomers', Auth.superUser, Customer.getCustomers)

    // Get Data of a single customer
    app.get('/api/getCustomer/:customer_id', Auth.superUser, Customer.getCustomer)

    // create new customer
    app.post('/api/addCustomer', [Auth.superUser, [check('name'), check('email')]], Customer.createCustomer)

    // update customer info
    app.patch('/api/updateCustomer/:customer_id', [Auth.superUser, [check('name'), check('email')]], Customer.updateCustomer)

    // delete customer
    app.delete('/api/deleteCustomer/:customer_id', Auth.superUser, Customer.deleteCustomer)

}

