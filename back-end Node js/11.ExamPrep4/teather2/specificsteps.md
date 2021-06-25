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
[x] Update config to match project requirements(db name)
    in config index givining another name of the db
[x] Addapt User models
    - in models/User.js - add:
    - *likedPlays:[{type: Schema.Types.ObjectId, ref: 'Play' }]
    - change the name NewMODEL.js with the new name 
    - *add likedPlays in const user = new User({}) in services/users.js as empty list
[x] Implements register, login, logout
    - .bail() - stop on the first validation add to each validation in the end except the last one.
    - in register form 
            - add =  value="{{userData.username}}"
            - action="/auth/register" method="POST"
    - in login form 
            - add =  value="{{userData.username}}"
            - action="/auth/login" method="POST"
    - in authController.js
        - add: throw new Error(Object.values(errors).map(e => e.msg).join('\n'));
        - errors:err.message.split('\n')
    in layouts/main.hbs
            {{#if errors}}
            <section class="notifications error">
                {{#each errors}}
            <p>{{this}}</p>
                {{/each}}
            </section>
            {{/if}}
    - ****in register and login if name is missing we should add them!!!!
[x] - test   

[x] create models for project specific data
    based on the requiremnts:
        example: 
         text: {type: String, required: true },
         number: { type: Number, min: 1, max: 6 },
         yes/no: {type: Boolean, default: false },
         image: {type: String, required: true }
         date: {type: Data, default: Date.now }
         ref to other model: [{type: Schema.Types.ObjectId, ref:'NAMEOFTEMODEL', default:[] }] or author: {type: Schema.Types.ObjectId, ref:'User'}
         description: {
        type: String, 
        required: true,
        maxLength:50 },



        example:
    -     title: {type: String, required: true },
    -     public: {type: Boolean, default: false },
    -     createdAt: {type: Data, default: Date.now },
    -     userLiked: [{type: Schema.Types.ObjectId, ref:'User', default:[] }],
    -     author: {type: Schema.Types.ObjectId, ref:'User'}
[x] create data services and middlewares 
    services/change tHE NAME .js

        - async function getAllPlays(){};
        - async function getPlayById(id){}
        - async function createPlay(playData){}
        - async function editPlay(id, playData){}
        - async function deletePlay(id){}
     

[x] create "NEWMODEL" controller
     CHANGE THE NAME IN ROUTER.JS

GRUD

[] create "SOMETHING"
    [] in views/ create
        []  <form class="theater-form" action="/NEW NAME/create" method="POST">
        [] - create 
        text - value="{{playData.title}}"
        textarea - {{playData.description}}"
        checkbox - {{#if playData.public}}checked{{/if}}
        [] check the name of each input
    [] in services/ NEWNAME

        [] async function createPlay(playData){
            fill the gaps
        }
        [] check middawares/storage if the new servise is updated
    [] create NEWNAMEController
            const router = require('express').Router();
            module.exports = router;
        [] the controller has to be mounthnat in coonfig/routes
        [] import routs from express and create two routs:
            []router.get('/create', isUser(), (req, res)=>{
                res.render('play/create');
                });
            []router.post('/create', isUser(), async(req,res)=>{
                console.log(req.body);
                res.render('play/create', ctx);
    }




[] Edit "SOMETHING"
    [] in views/ edit
        []  <form class="theater-form" action="/NEW NAME/edit" method="POST">
        [] - edit
        text - value="{{playData.title}}"
        textarea - {{playData.description}}"
        checkbox - {{#if playData.public}}checked{{/if}}
        [] check the name of each input

});



[] Delete "SOMETHING"



[] render ALL in home or catalog


[ ] in templates:
         <form class="theater-form" action="/NEW NAME/create" method="POST">
    - create,edit    add name to tha form  
    also 
    - create 
        text - value="{{playData.title}}"
        textarea - {{playData.description}}"
        checkbox - {{#if playData.public}}checked{{/if}}

 [] add custome messeages in the model. 

 []   

