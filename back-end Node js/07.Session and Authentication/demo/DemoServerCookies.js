const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    let visited = 0;
    if  (req.headers.cookie){
        let value = Number(req.headers.cookie.split('=')[1]);
        visited = value;
        console.log('Known client, lifetime visits: ',visited);
    }

    res.setHeader('Set-Cookie', `sessionId=${visited+1}`)

    res.send(`<h1>Hello</h1><p>You have visited this web page ${visited} times</p>`);
});

app.listen('3000');