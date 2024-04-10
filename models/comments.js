const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentsSchema = new Schema ({
    content:{type:String, required:true},
    post:{type:Schema.Types.ObjectId, ref: 'Post'},
    author:{type:Schema.Types.ObjectId, ref:'User'}
}, {timestamps:true});

module.exports = mongoose.model('Comments', commentsSchema);