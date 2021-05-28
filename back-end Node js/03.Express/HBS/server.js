const express = require('express')
hbs = require('express-handlebars')

const app = express();

app.engine('hbs', hbs({
    //partialsDir: './views',
    extname: '.hbs'
}));

// app.set('view', 'templates')
app.set('view engine', 'hbs'); // looking for extention .hbs if we miss to type it in

app.get('/', (req, res) =>{
    data = {
        user:{
            username:'Peter1'
        },
        title: 'Home Page',
        name: 'Pesho',
        age: 24,
        items:[
            'Lint',
            'Wallet',
            'Gun',
            'Mask',
        ],
        itemsPocket2:[
            {
                type: 'Lint',
                qty: 5
            },
            {
                type: 'Mask',
                qty: 3
            },

        ],
        itemsPocket3: [],
    }
    res.render('home', data);
    // res.send('It\'s workinsssssssssg');
})


app.get('/catalog',(req, res) =>{
    res.render('catalog', {items: [
        {
            type: 'Washer',
            qty: 45
        },
        {
            type: 'Bold',
            qty: 3/6
        }
    ]})
})

app.listen(3000, ()=>console.log('Server is on')); 


