const Pet = require('../models/pet');
const User = require('../models/user')

module.exports = {
    new:addPet,
    create,
    show
}
async function addPet(req,res){
    res.render('pets/new')
}

async function create(req,res){
    const pet = await Pet.create(req.body);
    await pet.save();
    res.redirect(`/pets/${pet.id}`)
}

async function show(req, res){
    const pet = await Pet.findById(req.params.id);
    const user = await User.findById(pet.owner)
    res.render('pets/show', {pet, user});
}