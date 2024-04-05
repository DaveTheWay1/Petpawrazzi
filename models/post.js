const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    img:{type:String, required:true},
    content:{type:String},
    petName:{type:Schema.type.ObjectId, ref: 'Pet'},
    author:{type:Schema.type.ObjectId, ref: 'Pet'},
    likes:{type:Number, default:0}
}, {timestamps:true});

module.exports= mongoose.model('Post', postSchema);