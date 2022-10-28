const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../model/user')
const Admin = require('../model/Admin')
const bcrypt = require('bcrypt')

function initialize(password){
  const authenticateUser = async (email, password, done) =>{
      const user = await User.findOne({email})
      if(user==null){
          return done(null, false,  {message: 'No User Registered With This Email'})
      }

      try {
          if (await bcrypt.compare(password, user.password)){
              return done(null, user)
          }
          else{
              return done(null, false, {message: "Password Incorrect"})
          }
      } catch (error) {
          return done(error)
      }
  }

  //authenticateAdmin
  const authenticateAdmin = async (email, password, done) =>{
    const admin = await Admin.findOne({email})
    if(admin==null){
        return done(null, false,  {message: 'No User Registered With This Email'})
    }

    try {
        if (await bcrypt.compare(password, admin.password)){
            return done(null, admin)
        }
        else{
            return done(null, false, {message: "Password Incorrect"})
        }
    } catch (error) {
        return done(error)
    }
}

  passport.use('local-user',new localStrategy({usernameField: 'email'},
  authenticateUser))

  passport.use('admin',new localStrategy({usernameField: 'email'},
  authenticateAdmin))

  passport.serializeUser((user,done) =>{
      done(null, user.id);
  });

// passport.serializeUser((user,done) =>{
//           if('local-user'(user)){
//             done(null, user.id)
//           }
//           else if('admin'(user)){
//             done(null, user.id)
//           }
//       });

//   passport.deserializeUser((id, done)=>{
//       User.findById(id, (err, user) => done(err, user));
//   });
passport.deserializeUser(function(id, done){
    Admin.findById(id, function(err, user){
      if(err) done(err);
        if(user){
          done(null, user);
        } else {
           User.findById(id, function(err, user){
           if(err) done(err);
           done(null, user);
        })
    }
 });
})
}

module.exports = initialize
