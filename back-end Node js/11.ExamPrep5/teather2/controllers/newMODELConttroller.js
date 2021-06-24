const router = require('express').Router();
const router = require('express').Router();
const { isUser } = require('../middlewares/guards')
const { parserError } = require('../util/parsers');


router.get('/create', isUser(), (req, res)=>{
    res.render('NEW_NAME/create');
});

router.post('/create', isUser(), async(req,res)=>{
    console.log(req.body);
    try {
        const playData = {

            NEW_REQUIREMENTS

            // <!-- title: req.body.title,
            // description: req.body.description,
            // imageUrl: req.body.imageUrl,
            // public: Boolean(req.body.public),
            // author: req.user._id, -->
        };

        await req.storage.createNEW_NAME(playData)

        res.redirect('/');
    }catch (err){
        console.log(err.message);

        const ctx = {
            errors: parserError(err),
            playData: {
                NEW_REQUIREMENTS

                // <!-- title: req.body.title,
                // description: req.body.description,
                // imageUrl: req.body.imageUrl,
                // public: Boolean(req.body.public), -->

            }
        };
        res.render('NEW_NAME/create', ctx);
    }
});

module.exports = router;
