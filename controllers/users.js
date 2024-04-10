const User = require('../models/user')



module.exports = {
    index,
    show
}

async function index(req,res){
    res.render('home', {title:Petpawrazzi})
}

async function show(req,res){
    const user = await User.findById(req.params.id).populate({path:'pets', populate:{path:'posts'}});
    res.render('users/profile', {user});
}
