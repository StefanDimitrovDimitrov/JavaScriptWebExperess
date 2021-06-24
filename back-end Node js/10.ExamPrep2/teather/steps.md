# Project development flow

[x] initialize NPM project
    - npm init -y 

[x] Create folders structure
    - config
    - controllers
    - models
    - middewars
    - services
    - util
    - views
        - layouts
        - partials

[x] Install Libraries
    npm i express mongoose bcrypt cookie-parser jsonwebtoken express-validator express-handlebars

[ x] Create initilization files
[ x] - index - create and start(EXPRESS) application
    - create file init.js
    - import express
    - create const variable app -> call factory function express();
    - app.get('/', (req,res) => res.send('It works!'));
    - app.listen(3000)
    - create function start() including - app. app.get,     app.listen(PORT, ()=> console.log(`Application started at http://localhost:${PORT}`)

[x ] - config files - database connect, Express middlewares(body-parser, static), external middleware(Cookie parser, bcrypt, jwt)
    - create 4 files express.js, index.js, database.js, routers.js

    in index.js file:
        module.exports = {
        PORT:3000,
        DB_CONNECTION_STRING: 'mongodb://localhost:27017/exam-db',
    in express.js file:
        const express = require('express');
        module.exprorts = (app) => {
            app.use('/static', express.static('static'));
            app.use(express.urlendcoded({extended:true}))
            app.use(cookieParser())
        }
    in databse. js
        const mongoose = require('mongoose');

        const { DB_CONNECTION_STRING } = require('./index')

        module.exports = (app) => {
            return new Promise((resolve, reject) => {
                mongoose.connect(DB_CONNECTION_STRING,{
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });

                const db = mongoose.connection
                db.on('error', (err) => {
                    console.error('connection error:', err);
                    reject(err);
                });
                db.once('open', function() {
                    console.log('Database ready');
                    resolve();
                });
        });
};

}
        
[ x] Create generic User model
    - User.js
        const { Schema, model } = require('mongoose');

        const schema = new Schema({
            username: { type: String, require: true },
            hashedPassword: { type: String, required: true } 

        });

module.exports = model('User', schema)

[x ] Create user servcie and auth middleware
    - user.js in service folder
        
            const User = require('../models/User');


            async function createUser(username, hashedPassword){
                //TODO adapt to the current project

                const user = new User({
                    username,
                    hashedPassword
                });

                await user.save();

                return user;
            }

            async function getUserByUsername(username) {
                const pattern = new RegExp(`^${username}$`, 'i');
                const user = await User.findOneAndDelete({username: {
                    $regex: pattern} });
                return user;

            }

            module.export = {
                createUser,
                getUserByUsername
            };


    - auth.js in middlewars folder

        
[ x] Test service module and the user module
[x ] Create mock routes for register, login and logout
    - js file authCOntroller in folder controller 
    const router = require('express').Router();

        router.get('/register', (req, res) =>{

        })

module.exports = router;
[ x] Create routes guards
[x] Create generic storage middleware

#Specifics

[ ] include resources(HTML & CSS, etc.)
[ ] Arrange templates (without editing)
[ ] Update config to match project requirements(db name)
[ ] Addapt User models
[ ] Implements register, login, logout
[ ] create models for project specific data
[ ] create data services and middlewares 
[ ] create actions for project-specific functionality