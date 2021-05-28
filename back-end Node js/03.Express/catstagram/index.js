const express = require('express');
//const catalogRouter = require('./catalog');
const logger = require('./logger');
const isAdmin = require('./guard')
const fallback = require('./fallback')

const app = express();

app.use('/static', express.static('static'))
app.use('/public', express.static('static'))

app.use(fallback);
//app.use(catalogRouter);
// app.use(logger); // each rout use the logger as middleware 


// app.get('/', logger, (req, res) => {
//     res.sendFile(__dirname + '/static/index.html');
// });

app.get('/',(req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});
 
app.get('/',(req, res) => {
    res.send('Hello, Express!');
    res.sendFile(__dirname + '/static/index.html')
})

// download file

app.get('/tos',(req, res) =>{
    //res.sendFile(__dirname + '/demo.pdf')
    res.download('./test_document.txt') //content disposition
})

app.get('/about',(req, res) => {
    throw new Error('Test error')
    //res.send('About page');
});

// app.get('/catalog/:productId', (req, res) => {
//     console.log(req.params);
//     res.send('Catalog page');
// })

// app.post('/catalog', (req, res) => {
//     res.status(201)
//     res.send('Article created');
// });



app.get('/contact', (req, res)=>{
    res.redirect('/about');
})

app.get('/about', (req, res)=>{
    res.send('About page');
})

// * will execte the 404 msg in any rout if the app.all is in the end
app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found');
});

app.listen(3000, () => console.log('Servver listening on port 3000'));

app.use(fallback);