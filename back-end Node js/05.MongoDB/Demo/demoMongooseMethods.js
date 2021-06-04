const mongoose = require('mongoose')

start()

async function start() {
    const connectionStr = 'mongodb://localhost:27017/testdb';

    const client = await mongoose.connect(connectionStr, {
        userNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('Database connected on port 27017');

    const  personSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        age: {
            type: Number,
            min: [0, 'Age cannot be negative'],
            max: 122,

        }
    });
    const Person = mongoose.model('Person', personSchema);
    const person = new Person({
        age:-5
    })
    try{
        await person.save(); // we have to save the validation
    } catch (err){
        console.log('Cought the error');
        console.error(`>>>> ${err.message}`)
    }
    
    // personSchema.virtual('fullName').get(function(){
    //     return `${this.firstName} ${this.lastName}`;
    // });

    // personSchema.methods.sayHi = function() {
    //     console.log(`My name is ${this.firstName} and I am ${this.age} years old.`);
    
    // };

  



    // const person1 = new Person({
    //     firstName: 'Peter',
    //     lastName: 'Jaclson',
    //     age: 34
    // });

    // const person2 = new Person({
    //     firstName: 'John',
    //     lastName: 'Smith',
    //     age: 29
    // })

    // await person1.save();
    // await person2.save();
    // const people = await Person.find({});
    // people.forEach(p => p.sayHi())
    // people.map(p => p.fullName).forEach(n => console.log(n));
}