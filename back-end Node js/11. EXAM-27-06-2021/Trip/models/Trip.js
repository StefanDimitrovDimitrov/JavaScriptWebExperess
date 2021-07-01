const { Schema, model } = require('mongoose');


const schema = new Schema({
    startPoint: {type: String, required: true },
    endPoint: {type: String, required: true },
    date: {type: Date, default: Date.now.toString(),},
    time: { type: String, required: true},
    imgUrl:{type: String, required: true },
    carBrand:{type: String, required: true },
    seats:{type: Number, required: true },
    price:{type: Number, required: true },
    description:{type: String, required: true },
    creator:{type: Schema.Types.ObjectId, ref:'User' },
    biddies:[{type: Schema.Types.ObjectId, ref:'User', default:[]}],

});

module.exports = model('Trip', schema)