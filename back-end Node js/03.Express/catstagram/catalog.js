const router = require('express').Router();

router.get('/catalog', (req,res) => {
    res.send('Catalog page');
});

const data = {
    name: 'Peter',
    age: 23
}

app.post('/catalog', (req, res)=>{
    res.json(data);
})

module.exports = router;