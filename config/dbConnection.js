const mongoose = require('mongoose')

let dbConnection = ()=>{
   return mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Database connected");
        
    }).catch((error)=>{
      console.log("Database connection error", error);
      
    })
}

module.exports = dbConnection