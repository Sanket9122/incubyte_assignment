const mongoose = require('mongoose');

const SweetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Sweet name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0.01, 'Price must be greater than 0']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity in stock is required'],
    min: [0, 'Quantity cannot be negative'],
    default: 0
  },
  
  searchable: { 
    type: String,
    index: true
  }
}, {
  timestamps: true
});

// Pre-save hook to create a searchable field (for the GET /search endpoint)
SweetSchema.pre('save', function(next) {
  this.searchable = `${this.name} ${this.category} ${this.price}`.toLowerCase();
  next();
});

module.exports = mongoose.model('Sweet', SweetSchema);