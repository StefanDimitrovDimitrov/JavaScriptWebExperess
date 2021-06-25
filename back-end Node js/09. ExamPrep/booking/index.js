const express = require('express');

const { PORT } = require('./config');
const databaseConfig = require('./config/database')
const expressConfig = require('./config/express')
const routesConfig = require('./config/routes')

const userService = require('./services/user');
const authMiddleware = require('./middlewares/auth');


start();

async function start(){
    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);

    app.get('/', (req, res) => res.send('It works!'));
    
    app.listen(PORT, ()=> {
        testAuth();
        console.log(`Application started at http://localhost:${PORT}`)
    });
}


// async function testAuth() {
//     try {
//         const result = await userService.createUser('Peter', '123123')
//         console.log(result);

//         const user = await userService.getUserByUsername('peter');
//         console.log(user);

//     } catch (err) {
//         console.log('Error:', err.message);
//     }
// }

async function testAuth() {
    const reqMock = {};
    const resMock = {
        cookie() {
            console.log('Set cookie',arguments);
        }
    };
    const nextMock = () => {};


    try {
        const auth = authMiddleware();
        auth(reqMock, resMock, nextMock);
        await reqMock.auth.register('pesho', '023asd');

    } catch (err) {
        console.log('Error:', err.message);
    }
}  