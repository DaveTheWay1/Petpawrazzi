const Post = require('../models/post')
const Pet = require('../models/pet');
module.exports = {
    new:addPost,
    create,
    show,
    delete:deletePost,
    edit,
    update
}
async function addPost(req,res){
    try {
        const pet = await Pet.findById(req.params.id).populate('owner')
        res.render('pets/create_post', {pet})
    } catch (error) {
        console.log(error)
    }
}

async function create(req,res){
    try {
        const petId = req.body.petName;
        const pet = await Pet.findById(petId);
        const post = await Post.create(req.body);
        await post.save();
        pet.posts.push(post);
        await pet.save();
        res.redirect(`/post/${post.id}`);
    } catch (error) {
        console.log(error)
    }
}

async function show(req, res){
    try {
        const post = await Post.findById(req.params.id).populate(['petName', 'author']);
        console.log(post);
        res.render('pets/post', {post})
    } catch (error) {
        console.log(error)
    }
}

async function deletePost(req,res){
    try {
        const posts = Post.find({})
        const deletedPost = await Post.findByIdAndDelete(req.params.id).populate('petName');
        console.log(posts)
        res.redirect(`/pets/${deletedPost.petName.id}`)
    } catch (error) {
        console.log(error)
    }
}

async function edit(req,res){
    try {
        const post = await Post.findById(req.params.id).populate(['petName', 'author']);
        res.render('pets/edit', {post})
    } catch (error) {
        console.log(error)
    }
}

async function update(req,res){
    try {
        const _id = req.params.id;
        const body = req.body
        const post = await Post.findByIdAndUpdate(_id, body,{new:true});
        console.log(post);
        await post.save();
        res.redirect(`/post/${post.id}`)
    } catch (error) {
        console.log(error)
    }
}