const Post = require('../models/post')
const Pet = require('../models/pet');
module.exports = {
    new:addPost,
    create
}
async function addPost(req,res){
    const pet = await Pet.findById(req.params.id).populate('owner')
    res.render('pets/create_post', {pet})
}

async function create(req,res){
    const petId = req.body.petName;
    console.log(petId)
    const pet = await Pet.findById(petId);
    console.log(pet)
    const post = await Post.create(req.body);
    console.log(post)
    await post.save();
    pet.posts.push(post);
    await pet.save();
    console.log(pet)
    res.render('pets/post')
}