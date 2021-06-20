const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const{ TOKEN_SECRET, COOKIE_NAME } = require('../config');
const userService = require('../services/user');

function init(){
    return function (req, res, next){
        // todo parse jwt
        // attach functions to coontext
        req.auth={
            async register(username, password) {
                const token = await register(username, password);
                res.cookie(COOKIE_NAME, token);
            },
            async login(username, password) {
                const token = await login(username, password);
                res.cookie(COOKIE_NAME, token)
            },
            logout() {
                res.clearCookie(COOKIE_Name)
            }
        },

        next();
    }
}


async function register(username, password){
    //todo adapt parameters to project

    const existing = await userService.getUserByUsername(username);

    if(existing) {
        throw new Error('Username is taken!');
    }

    const hashedPassword = await  bcrypt.hashSync(password, 10);
    const user = await userService.createUser(username, hashedPassword);
    
    return generateToken(user)

}

async function login(useername, password){
    const user = await userService.getUserByUsername(username);

    if (!user) {
        throw new Error('No such user');
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if(!hasMatch) {
        throw new Error('Incorect password');
    }

    return generateToken(user)
}



function generateToken(userData){
    return jwt.sign({
        _id: userData._id,
        username: userData.username
    }, TOKEN_SECRET)

}