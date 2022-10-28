const User = require('../model/user')
const Admin = require('../model/Admin')
const jwt = require('jsonwebtoken')
const Product = require('../model/Product')
const Contact = require('../model/Contact')
require("dotenv").config();



exports.register = (req, res) =>{
    console.log(req.body)

    const {name, email, password, passwordConfirm, phone, address, pincode, gender,} = req.body

    
        
    User.findOne({email})
        .exec((error, user)=>{
            console.log(user)
            if(user) return res.render('register',{
                message: 'Email Already Registered'
            })
            
            if(!name || !email || !password || !passwordConfirm || !address || !phone || !pincode){
                return res.render('register',{
                    message: 'Enter All details'
                }) 
            }

            if(passwordConfirm != password){
                return res.render('register',{ 
                    message: 'password does not match'
                })
            }

            const _user = new User({
                name : req.body.name,
                email : req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                pincode: req.body.pincode,
                password : req.body.password,
                gender: req.body.gender,
            })

            _user.save((error, data)=>{
                if(error) {
                    console.log(error)
                    return res.status(400).json({
                        message: 'Something went Wrong'
                    })
                }
                if(data){
                    return res.redirect('/login')
                }
            })
        })
    }

    //admin reg
exports.adminRegister = (req, res) =>{
    console.log(req.body)

    const {email, password} = req.body

    
        
    Admin.findOne({email})
        .exec((error, user)=>{
            console.log(user)
            if(user) return res.render('register',{
                message: 'Email Already In used'
            })
            
            if( !email || !password){
                return res.render('register',{
                    message: 'Enter All details'
                }) 
            }

            const _user = new Admin({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                gender: req.body.gender
            })

            _user.save((error, data)=>{
                if(error) {
                    console.log(error)
                    return res.status(400).json({
                        message: 'Something went Wrong'
                    })
                }
                if(data){
                    return res.redirect('/')
                }
            })
        })
    }


exports.products = (req, res) =>{
        console.log(req.body)
    
        const {name, price, imgName, description} = req.body
    
        
            
        Product.findOne({name})
            .exec((error, user)=>{

                // if(user) return res.render('register',{
                //     message: 'Email Already In used'
                // })
                
                if( !name || !price){
                    return res.render('editProduct',{
                        message: 'Enter All details'
                    }) 
                }
    
                const _user = new Product({
                    name : req.body.name,
                    price: req.body.price,
                    imgName: req.body.imgName,
                    description: req.body.description
                })
    
                _user.save((error, data)=>{
                    if(error) {
                        console.log(error)
                        return res.status(400).json({
                            message: 'Something went Wrong'
                        })
                    }
                    if(data){
                        return res.redirect('/product')
                    }
                })
            })
        }

exports.contacts = (req, res) =>{
        console.log(req.body)
    
        const {name, address, phone, email, message} = req.body
    
        
            
        Contact.findOne({name})
            .exec((error, user)=>{

                // if(user) return res.render('register',{
                //     message: 'Email Already In used'
                // })
                
                if( !name || !address || !phone || !email || !message){
                    return res.render('amount/amount',{
                        message: 'Enter All details'
                    }) 
                }
    
                const _user = new Contact({
                    name : req.body.name,
                    address: req.body.address,
                    phone: req.body.phone,
                    email: req.body.email,
                    message: req.body.message
                })
    
                _user.save((error, data)=>{
                    if(error) {
                        console.log(error)
                        return res.status(400).json({

                            message: 'Something went Wrong'
                        })
                    }
                    if(data){
                        return res.redirect('/')
                    }
                })
            })
        }

    
