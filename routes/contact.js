const express =require("express");
const User = require('../model/user')
const Contact = require('../model/Contact')
const router = express.Router()
const {ensureAuth, ensureGuest, isAuthorized} = require('../middleware/auth');

router.get('/', ensureAuth, async(req, res)=>{
    const user = await Contact.find({user: req.user.id})
    res.render('contact/contact',{
        name: req.user.name,
        address: req.user.address,
        phone: req.user.phone,
        email: req.user.email
    })
})

module.exports = router