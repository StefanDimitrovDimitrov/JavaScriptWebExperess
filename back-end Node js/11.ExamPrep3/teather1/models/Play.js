const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: {type: String, required: [true, 'Title is required']},
    discription: {type: String, required: [true, 'Description is requires'], maxLength: [50, '50 max']},
    imageUrl: {type: String, required: true },
    public: {type: Boolean, default: false },
    createdAt: {type: Date, default: Date.now },
    userLiked: [{type: Schema.Types.ObjectId, ref:'User', default:[] }],
    author: {type: Schema.Types.ObjectId, ref:'User'}
});

module.exports = model('Play', schema)