const express = require("express")
const path = require('path')
const dotenv = require("dotenv")
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const connectDB =require('./config/db')
const connect_flash = require('express-flash')
const flash = require('connect-flash')
const MongoStore = require('connect-mongo')
const morgan = require('morgan')
const methodOverride = require('method-override')


//load config
dotenv.config({path: './config/config.env'})
 
connectDB()
// MONGO_URI = mongodb+srv://nikhil123:nikhil123@miniproject.178oh4l.mongodb.net/?retryWrites=true&w=majority

const app = express()
  
  
app.use(cookieParser('cat'));
app.use(session({ 
    secret: process.env.JWT_SECRET,
    cookie: {maxAge: 365 * 24 * 60 * 60 * 1000},
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
}))
app.use(flash())
app.use(connect_flash())


//passport middleware0
app.use(passport.session())
const initializePassport = require('./config/passport')
initializePassport(passport)

app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next(); });


app.set('view engine', 'ejs')


const publicDirectory = path.join(__dirname, './public') //For static files like css
app.use(express.static(publicDirectory))

//body parser
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.use(express.json())

if('NODE_ENV != production'){
app.use(morgan('dev'))
}



app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))
app.use('/admin', require('./routes/admin'))
app.use('/account', require('./routes/account'))
app.use('/contact', require('./routes/contact'))
app.use('/feedback', require('./routes/feedback'))


const PORT = process.env.PORT || 5001

app.listen(PORT, console.log(`Server Running on port ${PORT}`) )