const router = require('express').Router();

router.get('/', async (req, res)=>{
    const new_MODEL = await req.storage.getAllNewS()
    res.render('home', { new_MODEL });
})

module.exports = router;