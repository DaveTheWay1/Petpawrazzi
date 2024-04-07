const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts')
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/posts/create',ensureLoggedIn ,postsCtrl.create);
router.get('/pets/:id/posts/new', ensureLoggedIn, postsCtrl.new);

module.exports = router;