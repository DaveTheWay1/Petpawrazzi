const User = require('../models/user')



module.exports = {
    index,
    show
}

async function index(req,res){
    const user = await User.populate({
        path:'pets', 
        populate:{path:'posts', populate:{path:'comments'}}
    });
    console.log('HERE')
    console.log(`comment: ${user.comments}`)
    res.render('home', {title:Petpawrazzi}, {user})
}

async function show(req,res){
    const user = await User.findById(req.params.id)
    .populate({
        path:'pets', 
        populate:{path:'posts', populate:{path:'comments', populate:{path:'author'}}}
    });
    console.log(user.pets)
    user.pets.forEach(function(pet){
        pet.posts.forEach(function(post){
            post.comments.forEach(function(comment){
                console.log(comment.author.name)
            })
        })
    })
    res.render('users/profile', {user});
}
