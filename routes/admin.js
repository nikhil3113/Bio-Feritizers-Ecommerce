const express =require("express");
const flash = require("express-flash");
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')

router.get('/login',(req,res)=>{
    res.render("Admin/adminLogin")
})
router.get('/register',(req,res)=>{
    res.render("Admin/adminRegister")
})

module.exports = router 