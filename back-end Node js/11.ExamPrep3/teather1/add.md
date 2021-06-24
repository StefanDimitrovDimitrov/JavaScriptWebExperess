IN auth controller:

   body('password')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long').bail()
        .isAlphanumeric().withMessage('Password should consist only english letters and digits'),


FIX - IMPORTANT - to delete res.redirect from authController - register in the end

__________

[ ] add storagemiddaware in express

    const storageMiddleware = require('../middlewares/storage')
    app.use(storageMiddleware())

_______________
 in service play

 const User = require('../models/NEW_MODEL');


async function getAllPlays(){

};

async function getPlayById(id){

};

async function createPlay(playData){

};

async function editPlay(id, playData){

}

async function deletePlay(id){

};

module.exports = {
    getAllPlays,
    getPlayById, 
    createPlay,
    editPlay,
    deletePlay
};

___________

in model 
create NEW_Model

const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: {type: String, required: true },

});

module.exports = model('NEW_MODEL', schema)


___________
middlewares/storage
        

const playService = require('../services/play');

 
 module.exports = () => (req,res,next) => {

    req.storage = {
        ...playService
    };

    next()
}

in conttrolers 
create NEW_MODELController
const router = require('express').Router();


module.exports = router;

_________________

in routes.js

const authController = require('../controllers/authController')
const playController = require('../controllers/NEW_MODLEController')

module.exports = (app)=> {
    app.use('/auth', authController);
    app.use('/play', NEW_MODELController);
}

________
parser in utill

function parserError(err){
    if (err.name == 'ValidationError'){
        return Object.values(err.errors).map(e=> e.properies.message)
    }else {
        return [err.message];
    }


}

module.exports={
    parserError
}

______

in NEW_MODELController

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

            <!-- title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            public: Boolean(req.body.public),
            author: req.user._id, -->
        };

        await req.storage.createNEW_NAME(playData)

        res.redirect('/');
    }catch (err){
        console.log(err.message);

        const ctx = {
            errors: parserError(err),
            playData: {
                NEW_REQUIREMENTS

                <!-- title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                public: Boolean(req.body.public), -->

            }
        };
        res.render('play/create', ctx);
    }
});

module.exports = router;
