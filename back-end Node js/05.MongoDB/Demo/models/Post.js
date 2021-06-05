const { Schema } = require('mongoose');

const schema = new mongoose.Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Person'},
    title: { type: String, required: true },
    content: { type: String, minLength: 10}
});

module.exports = mongoose.model('Post', schema);