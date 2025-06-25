const mongoose = require('mongoose');


const connetDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            
            
        });
       

        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the process with failure
    }
}
module.exports = connetDb;
// This code defines a function to connect to a MongoDB database using Mongoose.