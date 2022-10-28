const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const ProductSchema= mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    price: { 
        type: String,
        required: true
    },
    description:{
      type : String
    },
    imgName: {
        type: String,
        required: true
      },
    
    
  });

 


  
  // export model user with UserSchema
  module.exports = mongoose.model("product", ProductSchema);
  
  