const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const CartSchema= mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    price: { 
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
      },
    
    
  });

 


  
  // export model user with UserSchema
  module.exports = mongoose.model("cart", CartSchema);
  
  