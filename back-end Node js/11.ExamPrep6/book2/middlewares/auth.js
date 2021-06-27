const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const{ TOKEN_SECRET, COOKIE_NAME } = require('../config');
const router = require('../controllers/authController');
const userService = require('../services/user');


// function init
module.exports = () => (req, res, next)=>{
    if(parseToken(req,res)){
        req.auth={
            async register(username, email, password) {
                const token = await register(username, email, password);
                res.cookie(COOKIE_NAME, token);
            },
            async login(username, password) {
                const token = await login(username, password);
                res.cookie(COOKIE_NAME, token)
            },
            logout() {
                res.clearCookie(COOKIE_NAME)
            }
        },

        next();  
    }

};


async function register(username, email, password){

    const existUsername = await userService.getUserByUsername(username);
    // const existEmail = await userService.getUserByEmail(email);

    // if(existUsername) {
    //     throw new Error('Username is taken!');
    // } else if (existEmail){
    //     throw new Error('Email is taken!');
    // }



    console.log(`>>>>${password}`);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser(username, email, hashedPassword);
    
    return generateToken(user)

}

async function login(username, password){
    const user = await userService.getUserByUsername(username);

    if (!user) {
        const err = new Error('No such user');
        err.type = 'credential';
        throw err;
    }
    console.log(password);
    console.log(user);
    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    console.log(hasMatch);
    if(!hasMatch) {
        const err =  new Error('Incorect password');
        err.type = 'credential';
        throw err;
    }

    return generateToken(user)
}



function generateToken(userData){
    return jwt.sign({
        _id: userData._id,
        username: userData.username,
        email:userData.email
    }, TOKEN_SECRET);

}

function parseToken(req,res){
    const token = req.cookies[COOKIE_NAME];
    if (token) {
        try{
            const userData = jwt.verify(token, TOKEN_SECRET);
            req.user = userData;
            res.locals.user = userData;
        }catch(err){
            res.clearCookie(COOKIE_NAME);
            res.redirect('/auth/login');
    
            return false;
    
        }
    }
    return true;
}

