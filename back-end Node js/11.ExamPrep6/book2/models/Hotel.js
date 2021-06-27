const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: { 
        type: String, 
        required: [true, 'Name is requiered'], 
        minLength: 4 
    },
    city: { 
        type: String, 
        required: [true, 'City is requiered'], 
        minLength: 3 
    },
    imageUrl: { 
        type: String, 
        required: [true, 'Img is requiered'], 
        match: [/^http?/, 'Image must be valid URL'] 
    },
    rooms:{type: 
        Number, required: 
        [true, 'Rooms are requiered'], 
        min: 1, max: 100 },
    bookedBy:[
        { type: Schema.Types.ObjectId, 
        ref: 'User'}
    ],
    owner:{ 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        requiered: true}

});

module.exports = model('Hotel', schema)