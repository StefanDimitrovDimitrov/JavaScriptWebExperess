const express = require('express');
const bodyParser = require('express').urlencoded;
const expressSession = require('express-session')

const users = {}

const app = express();
app.use(bodyParser({extended: false}));
app.use(expressSession({
    secret: 'my random secret',
    resave: false,
    saveUnitialized: true,
    cookie: { secure: false }
}));

app.all("*", (req, res, next)=>{
    console.log('>>>', req.method, req.url, req.body);
    console.log('>>> Session data', req.session);
    next()
})


app.get('/', (req, res)=>{
    res.send('<h1>Welcome</h1> <a href="/">Home</a> <a href="/register">Register</a> <a href="/login">Login</a>')
});


app.get('/register', (req, res) => {
    res.send(`
    <h1>Register</h1> <a href="/">Home</a> <a href="/register">Register</a> <a href="/login">Login</a>
    <form action="/register" method="POST">
    <label>Username: <input type="text" name="username"></label>
    <label>Password: <input type="password" name="password"></label>
    <label>Repeat: <input type="password" name="repapss"></label>
    <input type="submit" value="Register">
    </form>
    `);
});

app.get('/login', (req, res) => {
    res.send(`
    <h1>Login</h1> <a href="/">Home</a> <a href="/register">Register</a> <a href="/login">Login</a>
    <formd action="/login" method="POST">
    <label>Username: <input type="text" name="username"></label>
    <label>Password: <input type="password" name="password"></label>
    <input type="submit" value="Login">
    </form>
    `);
});


app.post('/register', (req, res) =>{
    const username = req.body.username;

    users[username]  ={
        id: ('0000' + (Macth.random() * 9999 | 0).toString(-4)),
        password: req.body.password
    };

    res.redirect('/login')
});

app.post('/login', (req, res) =>{
    const user = isers[req.body.username];
    if(user && user.password == req.body.password){
        req.session.user = user;
        res.redurect('/');
    }else {
        res.send('wrong password')
    }
});

app.listen('3000');

