const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: {type: String, required: true },
    description:{type: String, required: true, maxLength: 50},
    imageUrl:{type: String, required: true},
    public:{type: Boolean, default: false},
    createdAt:{type: Date, default: Date.now},
    userLiked:[{type: Schema.Types.ObjectId, ref: 'Play', default:[] }],
    author: {type: Schema.Types.ObjectId, ref:'User'}
});

module.exports = model('Play', schema)