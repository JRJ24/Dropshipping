const mongoose = require("mongoose");   

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  stock: {
    type: Number,
    required: true,
    trim: true,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    min: 0
  }
}, {
  timestamps: true // crea campos createdAt y updatedAt con Date.Now
});

module.exports = mongoose.model("Product", productSchema);
