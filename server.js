const express = require('express');
const port = process.env.PORT || 3002;
const mongoose = require('mongoose');
const db = require('config').get('ATLAS_URI');
const app = express();
const path = require('path');

app
    .use(express.json())
    .use('/api/user', require('./routes/user.route'))
    .use('/api/auth', require('./routes/auth.route'))
    .use('/api/employee', require('./routes/employee.route'))
    .use('/api/project', require('./routes/project.route'))
    .use('/api/task', require('./routes/task.route'))
    .use('/api/customer', require('./routes/customer.route'))

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client", "build")));
//     app.get('/*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });
} else {
    app.get("/", (req, res) => res.send(`Worklog is running on port: ${port}`));
};


mongoose.connect(db, ()=>{
    app.listen(port, ()=>{
        console.log(`Server established at port ${port}, DB Connected`)
    })
});

 
