const mongoose = require('mongoose');


const getDBURI = () => {
  const environment = process.env.DB_ENVIRONMENT || 'LOCAL';
  
  if (environment === 'ATLAS') {
    const atlasURI = process.env.DB_URI_ATLAS;
    if (!atlasURI || atlasURI.includes('username')) {
      throw new Error(
        'DB_URI_ATLAS is not properly configured. Please update your .env file with valid MongoDB Atlas credentials.\n' +
        'Format: mongodb+srv://username:password@cluster.mongodb.net/database'
      );
    }
    return atlasURI;
  }
  
  const localURI = process.env.DB_URI_LOCAL;
  if (!localURI) {
    throw new Error(
      'DB_URI_LOCAL is not defined. Please set DB_URI_LOCAL in your .env file.\n' +
      'Example: DB_URI_LOCAL=mongodb://localhost:27017/sweetshopdb'
    );
  }
  return localURI;
};


const connectDB = async () => {
  try {
    const DB_URI = getDBURI();
    const environment = process.env.DB_ENVIRONMENT || 'LOCAL';
    
    await mongoose.connect(DB_URI, {
       
    });
    console.log(`🔗 MongoDB (${environment}) connected successfully.`);
  } catch (error) {
    console.error(' MongoDB connection failed:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = { connectDB };