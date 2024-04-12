const Pet = require('../models/pet');
const User = require('../models/user');
const Post = require('../models/post');
const post = require('../models/post');

module.exports = {
    new:addPet,
    create,
    show,
}
async function addPet(req,res){
    res.render('pets/new')
}

async function create(req,res){
    try {
        const pet = await Pet.create(req.body);
        const user = await User.findById(pet.owner);
        user.pets.push(pet)
        await pet.save();
        await user.save();
        res.redirect(`/pets/${pet.id}`)
    } catch (error) {
        console.log(error)
    }
}

async function show(req, res){
    try {
        const pet = await Pet.findById(req.params.id).populate(['owner', {path:'posts', populate:{path:'comments', populate:{path:'author'}}}]);
        const user = await User.findById(pet.owner);
        console.log(pet);
        res.render('pets/show', {pet, user});
    } catch (error) {
        console.log(error)
    }
}
