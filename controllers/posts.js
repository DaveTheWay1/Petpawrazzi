const Post = require('../models/post')
const Pet = require('../models/pet');
module.exports = {
    new:addPost,
    create,
    show
}
async function addPost(req,res){
    const pet = await Pet.findById(req.params.id).populate('owner')
    res.render('pets/create_post', {pet})
}

async function create(req,res){
    const petId = req.body.petName;
    const pet = await Pet.findById(petId);
    const post = await Post.create(req.body);
    await post.save();
    pet.posts.push(post);
    await pet.save();
    res.redirect(`/post/${post.id}`);
}

async function show(req, res){
    const post = await Post.findById(req.params.id).populate(['petName', 'author']);
    console.log(post);
    res.render('pets/post', {post})
}