/**
 * Author: Md Sholayman
 * Description: This is the file where config has holded.
 * Date : 06 September,2023.
 */


const express = require('express');
const app = express();
require("dotenv").config();
const router = require("./src/Routes/api");
const mongoose = require("mongoose");


//importing security middlewares
const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const { rateLimit } = require('express-rate-limit');


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: RateLimit-* headers; draft-7: combined RateLimit header
	legacyHeaders: false, // X-RateLimit-* headers
	// store: ... , // Use an external store for more precise rate limiting
})


//implementations of security middlewares.
app.use(express.json());
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(mongoSanitize());
app.use(limiter);





//implementation of routes
app.use("/api/v1",router);


//implementation if undefined route
app.use("*" , (req,res) =>{
    res.status(404).json({message:"Fail",data:"Not Found"});
});



//MongoDB database connection

async function connectToMongoDB() {
    try {
        const uri ="mongodb://0.0.0.0:27017/TaskManager";
      const OPTIONS = {user:"" , pass:""} 
      await mongoose.connect(uri);
      console.log('Connected to MongoDB');
  
      // Perform database operations here
  
   
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  
  // Call the async function to connect to MongoDB
  connectToMongoDB();


module.exports = app ;