const User = require('../models/user')

module.exports = {
    index,
    show
}

function index(req,res){
    res.render('home', {title:Petpawrazzi})
}

async function show(req,res){
    const user = await User.findById(req.params.id) 
    res.render('users/profile', {user})
}