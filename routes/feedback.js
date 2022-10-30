const express =require("express");
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')
const User = require('../model/user')
const Product = require('../model/Product')
const Feedback = require('../model/Feedback')

router.get('/',async(req, res)=>{
    const feedbacks = await Feedback.find()
    res.render('feedback/display',{
        feedbacks: feedbacks
    })
})

router.get('/feedbackForm', async(req, res)=>{
    const user = await User.find({user: req.user.id})
    const items = await Product.find()
    res.render('feedback/form',{
        name: req.user.name,
        phone: req.user.phone,
        email: req.user.email,
        items:items
    })
})

router.delete('/:id', async(req, res)=>{
    await Feedback.findByIdAndDelete(req.params.id)
    res.redirect('/feedbacks')
})


module.exports = router 