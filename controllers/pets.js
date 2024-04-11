const Pet = require('../models/pet');
const User = require('../models/user');

module.exports = {
    new:addPet,
    create,
    show,
    delete:deletePet
}
async function addPet(req,res){
    res.render('pets/new')
}

async function create(req,res){
    const pet = await Pet.create(req.body);
    const user = await User.findById(pet.owner);
    user.pets.push(pet)
    await pet.save();
    await user.save();
    res.redirect(`/pets/${pet.id}`)
}

async function show(req, res){
    const pet = await Pet.findById(req.params.id).populate(['owner', {path:'posts', populate:{path:'comments'}}]);
    const user = await User.findById(pet.owner);
    console.log(pet);
    res.render('pets/show', {pet, user});
}

async function deletePet(req,res){
    const pets = Pet.find({}) // we find all here to help see if the one we delete gets removed.
    const deletePet = await Pet.findByIdAndDelete(req.params.id);
    console.log(pets); // we console log to see if indeed it got removed from users pets
    res.redirect(`/users/${deletePet.owner}`)
}