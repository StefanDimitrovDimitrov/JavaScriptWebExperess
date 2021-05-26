const express = require('express');

const app = express();
// има значение реда на изпълнение от горе на долу, което отговаря на изискванията. 
app.get('/', (req, res) => {
    res.send('Hello world from express!')
})

//  we can replace * with different routs and still will shoul some cure cats or *cats if ends in cats will work again
app.get('/*/cats', (req, res) =>{
    res.send('some cute cats')
})

app.post('/cats', (req, res)=>{
    console.log('crete cat');

    res.status(201).send('cat created!');
});

app.all('/', (req, res) => {
    console.log('handle all requests')
    res.end()
})

app.listen(5000, () => console.log('Serve is running on port 5000'))