const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts')
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/posts/create',ensureLoggedIn ,postsCtrl.create);
router.get('/pets/:id/posts/new', ensureLoggedIn, postsCtrl.new);
router.get('/post/:id', ensureLoggedIn, postsCtrl.show)
router.delete('/post/:id', ensureLoggedIn, postsCtrl.delete)
router.get('/post/:id/edit',ensureLoggedIn, postsCtrl.edit);
router.put('/post/:id',ensureLoggedIn, postsCtrl.update);

module.exports = router;