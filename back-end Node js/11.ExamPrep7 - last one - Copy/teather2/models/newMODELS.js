const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: {type: String, required: true },

});

module.exports = model('NEW_MODEL', schema)