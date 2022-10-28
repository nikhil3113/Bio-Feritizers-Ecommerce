const express =require("express");
const User = require('../model/user')
const router = express.Router()
const {ensureAuth, ensureGuest, isAuthorized} = require('../middleware/auth');
const user = require("../model/user");
//Retreive User name and display details
router.get('/', ensureAuth,  async(req, res)=>{
    try{
        const user = await User.find({user: req.user.id})
        const date = Date(Date.now()).toString()
        // const tDate = date.toString() 
        res.render('account/account',{
            name: req.user.name.toUpperCase(),
            phone: req.user.phone,
            address: req.user.address,
            pincode: req.user.pincode,
            id: req.user.id,
            role: req.user.role,
            user,
            date: date
        })
    } catch(err){
        console.log(err)
        res.send('505 eroor')
    }
})

//@desc show edit page
//@route GET /stories/edit/:id
router.get('/edit/:id', ensureAuth,async (req, res)=>{
    try {
        const user = await User.findById(req.params.id)
        res.render('account/edit', {user: user})
        
        // const details = await User.findOne({
        //     _id: req.params.id
        // }).lean()
    
        // if(!details){
        //     return res.send('404 error')
        // }
    
        // if(details.user != req.user.id){
        //     res.redirect('/account')
        // } else{
        //     res.render('articles/edit', {details: details})
        // }
    } catch (err) {
        console.log(err)
        return res.send("Error 500")
    }
    
})

router.put('/:id', async(req, res)=>{
    try {
        let user = await User.findById(req.params.id)

        if(!user){
            return res.send('error/404')
        }
         else{
            user = await User.findOneAndUpdate({_id: req.params.id}, req.body, {
                new: true,
                runValidators: true
            })

            res.redirect('/account')
        }
    } catch (err) {
        console.log(err)
        return res.send('error/500')
    }
    
})

module.exports = router 