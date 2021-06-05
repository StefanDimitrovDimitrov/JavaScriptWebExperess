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
       //name: {type: String, require: true, unique: true},
       name: {
           type: String,
           required: true,
           validate: {
               validator: function(value) {
                   const letter = value.slice(0,1);
                   return letter === letter.toLocaleUpperCase();
               },
               message: props=>`Name must begin with capital letter - ${Object.keys(props)}`
           }
       },
        color: {
            type: String,
            require: true,
            enum: ['Grey', 'Orange', 'White', 'Black', 'Mixed']
            // enum: {
            //     values:['Grey', 'Orange', 'WWhite', 'Black', 'Mixed']
            //     message:'Color must be one of Grey, Orange, White, Black or Mixed'
            // }
        }
    });

    const Cat = mongoose.model('Cat', catSchema);

    try{
        const someCat = new Cat({
            name: 'Fluffy',
            color: 'Brown'
        });
        await someCat.save();
    } catch (err) {
        console.log('Caught the error');
        console.error('>>>', err.message)
    }


    // const data = await Cat.find({});
    // console.log(`before ${data}`)

    // const myCat = new Cat({
    //     name: 'Boby',
    //     color: 'black'
    // });

    // await myCat.save();

    // const data1 = await Cat.find({});
    // console.log(`after ${data1}`);
}



