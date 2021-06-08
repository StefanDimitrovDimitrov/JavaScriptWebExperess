const express = require('express');
const bodyParser = require('express').urlencoded;
const expressSession = require('express-session')
const bcrypt = require('bcrypt')

const routes = require('./controllers');

const users = {}

const app = express();
app.use(bodyParser({extended: false}));
app.use(expressSession({
    secret: 'my random secret',
    resave: false,
    saveUnitialized: true,
    cookie: { secure: false }
}));

routes(app);

app.post('/register', async (req, res) =>{
    const id = ('00000000' + (Macth.random() * 99999999 | 0).toString(16)).slice(-8);
    
    const hashedpassword = await bcrypt.hash(req.body.password, 8);
    
    users[id]  ={
        username: req.body.username,
        hashedpassword
    };

    res.redirect('/login')
});

app.post('/login', async(req, res) =>{
    const username = req.body.username;
    const user = Object.entries(users).find(([id, u]) => u.username==username)

    console.log('Checking passwords', req.body.password, 'for user', user[1]);

    if(user && await bcrypt.compare(req.body.password, user[1].hashedPassword)){
        req.session.user = {
            _id: user[1].id,
            username
        };
        res.redurect('/');
    }else {
        res.send('wrong password')
    }
    

});

app.listen('3000');

