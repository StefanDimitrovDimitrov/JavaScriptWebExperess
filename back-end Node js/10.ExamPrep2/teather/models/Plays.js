// Play
// •	Title - string (required), unique
// •	Description - string (required), max length of 50 symbols,
// •	Image Url - string (required),
// •	Is Public - boolean, default - false,
// •	Created at – Date or String, required
// •	Users Liked - a collection of Users

const { Schema, model } = require('mongoose');


const schema = new Schema({
    title: {type: String, required: true },
    description: {type: String, required: true, maxLength: 50 },
    imageUrl: {type: String, required: true },
    public: {type: Boolean, default: false },
    createdAt: {type: Date, default: Date.now },
    usersLiked: [{type: Schema.Types.ObjectId, ref:'User', default:[] }],
    author: {type: Schema.Types.ObjectId, ref:'User'}
});

module.exports = model('Play', schema)