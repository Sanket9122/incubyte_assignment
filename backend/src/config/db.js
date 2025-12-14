const mongoose = require('mongoose');

//DB_URI2 == deployment features 
//DB_URI == for local development
const DB_URI = process.env.DB_URI || process.env.DB_URI2; 


const connectDB = async () => {
  try {
    
    await mongoose.connect(DB_URI, {
       
    });
    console.log('🔗 MongoDB connected successfully.');
  } catch (error) {
    console.error(' MongoDB connection failed:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = { connectDB };