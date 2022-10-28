const express =require("express");
const User = require('../model/user')
const router = express.Router()
const {ensureAuth, ensureGuest, ensureAdmin} = require('../middleware/auth');
const fs = require('fs')
const Product = require('../model/Product')
const Razorpay = require('razorpay');


router.get('/',(req,res)=>{
    
    res.render("index")
})
// router.get('/product', (req,res)=>{
//     res.render("product")
// })

// router.get('/product', function(req, res) {
//     fs.readFile('items.json', function(error, data) {
//       if (error) {
//         res.status(500).end()
//       } else {
//         res.render('product', {
//           items: JSON.parse(data)
//         })
//       }
//     })
//   })

router.get('/product', ensureAuth, async(req, res)=>{
  const items = await Product.find()
  res.render('product', {items: items})
})

//razorPay intigratrion
const instance = new Razorpay({
    key_id:process.env.razorpay_key_id,
    key_secret: process.env.razorpay_secret_id
})
router.get('/product/checkout', async(req, res)=>{
    //temp user
    const user = await User.find({user: req.user.id})
    const product = await Product.findOne({product: req.user.id})
    // console.log(product)
    // console.log(product.price)
    var options = {
        // amount: 6000 * 100,
        amount: product.price * 100,
        currency: 'INR',
    }
    instance.orders.create(options, function(err, order){
        if(err){
            console.log(err)
        }
        else{
            console.log(order)
            res.render('checkout', {amount: order.amount, order_id: order.id, email:req.user.email, phone:req.user.phone, address: req.user.address, name: req.user.name})
        }
    })
})
router.post('/product/checkout/pay-verify', (req, res)=>{
    console.log(req.body)
    body = req.body.razorpay_order_id + '|' + req.body.razorpay_payment_id
    var crypto = require('crypto')
    var expectedSignature = crypto.createHmac('sha256', 'FkgbV3FawE6BgDXnaDggadvm')
    .update(body.toString())
    .digest('hex')
    console.log('sig'+ req.body.razorpay_signature)
    console.log("sig"+expectedSignature)

    if(expectedSignature === req.body.razorpay_signature){
        console.log("Payment Success")
        return res.redirect('/product')
      }else{
        console.log("Payment Fail")
        return res.redirect('/product')
      }
})


router.get('/product/edit',(req,res)=>{
    res.render("editProduct")
})
router.get('/register', ensureGuest, (req,res)=>{
    res.render("register")
})
router.get('/login', ensureGuest, (req,res)=>{
    res.render("login")
})
router.get('/about', ensureAuth,(req,res)=>{
    res.render("about")
})

router.get('/secret', async(req, res)=>{
    const items = await Product.find()
    res.render('product', {items: items})
  })

router.get('/logout', (req, res, next) => {
    req.logout((error)=>{
        if (error) {return next(error)}
        res.redirect('/login')
    });  
})

module.exports = router 