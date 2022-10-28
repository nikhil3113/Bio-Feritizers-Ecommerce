const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const UserSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phone:{
      type: Number, 
      required: true,
      
    },
    address: {
      type: String,
      required: true
    },
    pincode: {
      type: Number,
      required: true
    },
    gender: {
        type: String
    },
    role:{
      type:String,
      default: "user",
      enum: ["user", "admin"]
    }
    
  });

  //Password Hashing
  UserSchema.pre("save", function (next) {
    const user = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            user.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  })


UserSchema.methods = {
  authenticate :function (password) {
      return bcrypt.compareSync(password, this.password)
  }
}


  
  // export model user with UserSchema
  module.exports = mongoose.model("user", UserSchema);
  
  