const express = require('express');

const app = express();


app.get('/',(req, res) => {
    res.send('Hello, Express!');
})

// download file

app.get('/tos',(req, res) =>{
    //res.sendFile(__dirname + '/demo.pdf')
    res.download('./test_document.txt') //content disposition
})

app.get('/about',(req, res) => {
    res.send('About page');
});

app.get('/catalog/:productId', (req, res) => {
    console.log(req.params);
    res.send('Catalog page');
})

app.post('/catalog', (req, res) => {
    res.status(201)
    res.send('Article created');
});

// * will execte the 404 msg in any rout if the app.all is in the end
app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found');
});

app.listen(3000, () => console.log('Servver listening on port 3000'));

