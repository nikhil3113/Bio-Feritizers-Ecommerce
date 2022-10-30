const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const feedbackSchema= mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    phone: { 
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
      },
    feedbackFor:{
        type:String
      },
    message: {
        type: String,
        required: true
    }
    
    
  });
  
 // export model user with UserSchema
  module.exports = mongoose.model("feedback", feedbackSchema);
  
  