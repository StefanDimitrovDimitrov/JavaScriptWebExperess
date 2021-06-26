const router = require('express').Router();

router.get('/', async (req, res)=>{
    const hotel = await req.storage.getAllHotels()
    res.render('home', { hotel });
})

module.exports = router;