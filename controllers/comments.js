const Comment = require('../models/comments');
const Post = require('../models/post');
const User = require('../models/user');

module.exports = {
    create,
    delete:deleteComment
}

async function create(req,res){
    try {
        const comment = await Comment.create(req.body);
        const post = await Post.findById(req.params.id);
        post.comments.push(comment);
        console.log(post.comments);
        await comment.save();
        await post.save();
        res.redirect('/home')
    } catch (error) {
        console.log(error)
    }
}

async function deleteComment(req,res){
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    console.log(deletedComment);
    res.redirect('/home');
}