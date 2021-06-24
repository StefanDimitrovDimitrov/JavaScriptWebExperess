commands:
    - nmp i
    - nodemon index.js or nodemon start


#Specifics

[x] include resources(HTML & CSS, etc.)
[x] Arrange templates (without editing)
    in leayout cut and paste the commant parts including {{{body}}}
    in layouts - 
                    <li><a href="/">Home </a></li>
                    <li><a href="/auth/logout">Logout</a></li>
                    <li><a href="/auth/login">Login</a></li>
                    <li><a href="/auth/register">Register</a></li>
    - all files has to be .hbs

[x] Update config to match project requirements(db name)
    in config index givining another name of the db
[x] Addapt User models
    - in models/User.js - add:
    - likedPlays:[{type: Schema.Types.ObjectId, ref: 'Play' }]
    - create new models called Play
    - add likedPlays in const user = new User({}) in services/users.js as empty list
[x] Implements register, login, logout
        in authController
    - .bail() - stop on the first validation add to each validation in the end except the last one.
    - "The username should be at least 3 characters long" - .isLength({ min: 3 }).withMessage()
    - " Password should consist only english letters and digits" - .isAlphanumeric().withMessage()

    body('password')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long').bail()
        .isAlphanumeric().withMessage('Password should consist only english letters and digits'),

    - in register form 
            - add =  value="{{userData.username}}"
            - action="/auth/register" method="POST"
    - in login form 
            - add =  value="{{userData.username}}"
            - action="/auth/login" method="POST"
    - in authController.js

        - add: throw new Error(Object.values(errors).map(e => e.msg).join('\n')); insted throw new Error('Validation error');
        - errors:err.message.split('\n') insted [err.message]
    in layouts/main.hbs
            {{#if errors}}
            <section class="notifications error">
                {{#each errors}}
            <p>{{this}}</p>
                {{/each}}
            </section>
            {{/if}}
    - ****in register and login if name is missing we should add them!!!!

[x] test register and login form 
    _________________________________________________

[ ] create models for project specific data
    based on the requiremnts:
    -     title: {type: String, required: true },
    -     public: {type: Boolean, default: false },
    -     createdAt: {type: Data, default: Date.now },
    -     userLiked: [{type: Schema.Types.ObjectId, ref:'User', default:[] }],
    -     author: {type: Schema.Types.ObjectId, ref:'User'}
[x] create data services and middlewares 
    services/Play.js

        - async function getAllPlays(){};
        - async function getPlayById(id){}
        - async function createPlay(playData){}
        - async function editPlay(id, playData){}
        - async function deletePlay(id){}
            module.exports={
                getAllPlays,
                getPlayById, 
                createPlay,
                editPlay,
                deletePlay
            }
    in middlewares/stoarage:
        const playService = require('../services/play');

        module.exports = () => (req,res,next) => {
            //TODO import and decorate services
            req.storage = {
                ...playService
            };
            next()
        }
[x] create "play" controller
    - const router = require('express').Router();
    - module.exports = router;
     
     in router add the path to the new controller 
        - const playController = require('../controllers/playController')
        - app.use('/play', playController);
[x] in templates:
         <form class="theater-form" action="/play/create" method="POST">
    - create,edit    add name to tha form  
    also 
    - create 
        text - value="{{playData.title}}"
        textarea - {{playData.description}}"
        checkbox - {{#if playData.public}}checked{{/if}}

[ ] create actions for project-specific functionality

    - in playController put the guards
    - also in router.post: 

[] in play controler 

const { parserError } = require('../util/parsers');


router.get('/create', isUser(), (req, res)=>{
    res.render('play/create');
});

router.post('/create', isUser(), async(req,res)=>{
    console.log(req.body);
    try {
        const playData = {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            public: Boolean(req.body.public),
            author: req.user._id,
        };

        await req.storage.createPlay(playData)

        res.redirect('/');
    }catch (err){
        console.log(err.message);

        const ctx = {
            errors: parserError(err),
            playData: {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                public: Boolean(req.body.public),

            }
        };
        res.render('play/create', ctx);
    }
});

___________

in util parser

