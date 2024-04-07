const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
    owner:{type:Schema.Types.ObjectId, ref:'User'},
    name:{type:String},
    age:{type:Number},
    gender:{type:String},
    breed:{type:String},
    animal:{type:String},
    posts:[{type:Schema.Types.ObjectId, ref:'Post'}],
    birthday: Date
}, {timestamps: true})

module.exports = mongoose.model('Pet', petSchema);