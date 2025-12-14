const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address']
  },
  password: { 
    type: String,
    required: [true, 'Password is required'],
    select: false 
  },
  role: {
    type: String,
    enum: ['customer', 'admin'], 
    default: 'customer'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  
  timestamps: true 
});


module.exports = mongoose.model('User', UserSchema);