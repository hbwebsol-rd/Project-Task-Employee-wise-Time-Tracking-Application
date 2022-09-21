const express = require('express');
const port = process.env.PORT || 3002;
const mongoose = require('mongoose');
const db = require('config').get('ATLAS_URI');
const app = express();
const path = require('path');
const cors= require('cors')

// Middleware
app.use(cors())
app.use(express.json())
    
// API Routes
require("./routes/user.route")(app);
require("./routes/customer.route")(app);
require("./routes/project.route")(app);
require("./routes/employee.route")(app);
require("./routes/task.route")(app);
require("./routes/export.route")(app);
    
    if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client", "build")));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
} else {
    app.get("/", (req, res) => res.send(`Worklog is running on port: ${port}`));
};


mongoose.connect(db, ()=>{
    app.listen(port, ()=>{
        console.log(`Server established at port ${port}, DB Connected`)
    })
});

 
