require('dotenv').config()
require('node:dns').setServers(['1.1.1.1','8.8.8.8'])
const express = require('express')
const dbConnection = require('./config/dbConnection')
const studentRoutes = require('./routes/studentRoutes');
const app = express()



dbConnection()

app.use(express.json())

app.use('/api/v1/students', studentRoutes);

let port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log("Server is running");
    
})


