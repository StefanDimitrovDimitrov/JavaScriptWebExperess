const { MongoClient } = require('mongodb');
const { Mongoose } = require('mongoose');
const Post = require('./models/Post');

start()
async function start(){

    const connectionStr = 'mongodb://localhost:27017/testdb';
    const client = await Mongoose.connect(connectionStr,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    

        console.log('Database connected');

    const post = new Post({
        author: Stefan,
        title: 'New Post test',
        content: 'This is post content'
    });

    await post.save()

}

