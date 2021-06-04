const mongoose = require('mongoose')

start()
async function start() {
    const connectionStr = 'mongodb://localhost:27017/testdb';

    const client = await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('Database connected ');

    const catSchema = new mongoose.Schema({
        name: {type: String, require: true, unique: true},
        color: String
    });

    const Cat = mongoose.model('Cat', catSchema);
    const data = await Cat.find({});
    console.log(`before ${data}`)

    const myCat = new Cat({
        name: 'Boby',
        color: 'black'
    });

    await myCat.save();

    const data1 = await Cat.find({});
    console.log(`after ${data1}`);
}



