const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    img:{type:String},
    caption:{type:String},
    petName:{type:Schema.Types.ObjectId, ref: 'Pet'},
    author:{type:Schema.Types.ObjectId, ref: 'Pet'},
    likes:{type:Number, default:0}
}, {timestamps:true});

module.exports= mongoose.model('Post', postSchema);