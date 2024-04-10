const Comment = require('../models/comments');
const Post = require('../models/post');
const User = require('../models/user');

module.exports = {
    create
}

async function create(req,res){
    const comment = await Comment.create(req.body);
    const post = await Post.findById(req.params.id);
    post.comments.push(comment);
    console.log(post.comments);
    await comment.save();
    await post.save();
    // post.comments.push(comment)
    // await post.save();
    // const user = await User.findById(req.params.id).populate({path:'pets', populate:{path:'posts'}});
    res.redirect('/home')
}