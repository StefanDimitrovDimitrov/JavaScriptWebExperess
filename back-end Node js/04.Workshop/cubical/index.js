// [yes] initialize express app
// [yes] setup handlebars
// [yes] setup static files
// [ ] setup storage middleware
// [ ] set route handlers(controller actions)

const express = require('express');

const hbs = require('express-handlebars');
const { about } = require('./controllers/about');
const { catalog } = require('./controllers/catalog');
const { details } = require('./controllers/details');
const { create, post } = require('./controllers/create');
const { notFound } = require('./controllers/notFound');


const port = 3000;
const app = express();
app.engine('hbs', hbs({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use('/static', express.static('static'))

app.get('/', catalog )
app.get('/about', about)
app.get('/details/:id', details)
app.get('/create', create)
app.post('/create', post)

app.all('*', notFound)



app.listen(port, () => console.log(`Server listening on port ${port}`));