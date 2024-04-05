const Pet = require('../models/pet');

module.exports = {
    new:addPet
}
async function addPet(req,res){
    res.render('pets/new')
}