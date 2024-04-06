const Pet = require('../models/pet');
const User = require('../models/user')

module.exports = {
    new:addPet,
    create
}
async function addPet(req,res){
    res.render('pets/new')
}

async function create(req,res){
    const pet = await Pet.create(req.body);
    const pets = await Pet.find({})
    const user = await User.findById(pet.owner)
    await pet.save();
    console.log(user.name)
    res.render('pets/new')
}