const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const ContactShema= mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    
    
    
  });

 


  
  // export model user with UserSchema
  module.exports = mongoose.model("contact", ContactShema);
  
  