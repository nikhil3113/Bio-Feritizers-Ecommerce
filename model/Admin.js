const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const AdminScehma = mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    
  });

  //Password Hashing
  AdminScehma.pre("save", function (next) {
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


AdminScehma.methods = {
  authenticate :function (password) {
      return bcrypt.compareSync(password, this.password)
  }
}


  
  // export model user with AdminScehma
  module.exports = mongoose.model("admin", AdminScehma);
  
  