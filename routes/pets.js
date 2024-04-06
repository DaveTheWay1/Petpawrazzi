const express = require('express');
const router = express.Router();
const petsCtrl = require('../controllers/pets')
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/pets/new', ensureLoggedIn, petsCtrl.new)
router.post('/pets/:id', ensureLoggedIn, petsCtrl.create)

module.exports = router;