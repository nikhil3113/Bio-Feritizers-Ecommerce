const User = require('../model/user')

module.exports = {
    ensureAuth: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next()
        }
        else{
            res.redirect('/login')
        }
    },
    ensureGuest: function(req, res, next){
        if(req.isAuthenticated()) {
            res.redirect('/')
        } else{
            return next()
        }
    },
    // ensureAdmin:  async function(req, res ,next, role){
    //     const user = await User.find({user: req.user.id})
    //     if(req.isAuthenticated() && user.role != 'admin'){
    //         return next()
    //     }
    //     else{
    //         res.redirect('/login')
    //     }
    // }
}