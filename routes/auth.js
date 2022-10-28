const express = require('express')
const {ensureAuth, ensureGuest} =require('../middleware/auth')
const passport = require('passport')
const authController = require('../controllers/auth')
const router = express.Router()

router.post('/register', authController.register)
router.post('/login',
  passport.authenticate('local-user', { 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash:true,
   })
)

router.post('/adminRegister', authController.adminRegister)
// router.post('/adminLogin', authController.adminlogin)

router.post('/adminLogin',
    passport.authenticate('admin', { 
      successRedirect: '/',
      failureRedirect: '/admin/login',
      failureFlash:true,
 }))

 router.post('/product', authController.products)
 
 router.post('/contact', authController.contacts)





module.exports = router 