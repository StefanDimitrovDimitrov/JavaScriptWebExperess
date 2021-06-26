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
         ref to other model: 
            [{type: Schema.Types.ObjectId, ref:'NAMEOFTEMODEL', default:[] }] or 
            author: {type: Schema.Types.ObjectId, ref:'User'}
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

[x] create "SOMETHING"
    [x] in views/ create
        [x]  <form class="theater-form" action="/NEW NAME/create" method="POST">
        [x] - create 
        text - value="{{playData.title}}"
        textarea - {{playData.description}}"
        checkbox - {{#if playData.public}}checked{{/if}}
        [x] check the name of each input
    [x] in services/ NEWNAME

        [x] async function createPlay(playData){
            fill the gaps
        }
        [x] check middawares/storage if the new servise is updated
    [x] create NEWNAMEController
            const router = require('express').Router();
            module.exports = router;
        [x] the controller has to be mounthnat in coonfig/routes
        [x] import routs from express and create two routs:
            [x]router.get('/create', isUser(), (req, res)=>{
                res.render('play/create');
                });
            [x]router.post('/create', isUser(), async(req,res)=>{
                console.log(req.body);
                res.render('play/create', ctx);

                note! 
                res.render('play/create');
                res.redirect('/play/create', ctx);
    }

[] render ALL in home or catalog
        [x] we have homeController
            [x] replays all new or play with new names
        [x] view home 
            [x] create parials with one item
                example:
                {{title}}
                href="/play/details/{{_id}}"
            [x] for in home.hbs
                    {{#each plays}}
                    {{> play}}
                    {{else}}
                    <h4>No plays yet...</h4>
                    {{/each}}
            [x] if in home 
                        {{#if user}}
                        <a class="btn create-play" href="/play/create">Create Theater</a
                        {{/if}}
            [x] if else in main
                <li><a href="/">Home </a></li>
                {{#if user}}
                <li><a href="/auth/logout">Logout</a></li>
                {{else}}
                <li><a href="/auth/login">Login</a></li>
                <li><a href="/auth/register">Register</a></li>
                {{/if}}
        [x] in service /plays 
        get all playes: return Play.find({public: true}).sort({createdAt: -1}).lean();
        

[] DETAILS:
        [] in service/ play
            async function getPlayById(id){
            return Play.findById(id).lean()
            // return New.findById(id).populate('usersLiked').lean();
        [] in playController
                router.get('/details/:id', async (req, res)=>{
            try{
                const play = await req.storage.getPlayById(req.params.id);
                play.hasUser = Boolean(req.user);
                play.isAuthor = req.user && req.user._id == play.author;
                play.liked = req.user && play.usersLiked.find(u => u._id == req.user._id);
                res.render('play/details', { play });
            }catch (err) {
                console.log(err.message);
                res. redirect('/404');
        [] in view /details 
            wrape all in {{#with play}}
                        {{/with}}
            [] find if who is author of the play 
                    const play = await req.storage.getPlayById(req.params.id);
                    play.hasUser = Boolean(req.user);
                    play.isAuthor = req.user && req.user._id == play.author;
            [] create loging in view with if 
        [] ipdate links of buttons edit and delete
                        <a class="btn delete" href="/play/delete/{{_id}}">Delete</a>
                <a class="btn edit" href="/play/edit/{{_id}}">Edit</a>
    }
});

};

[] Edit "SOMETHING"
    [] update view - 
        form class="theater-form" action="play/edit/{{play._id}}" method="POST">

        [] - edit
        text - value="{{playData.title}}"
        textarea - {{playData.description}}"
        checkbox - {{#if playData.public}}checked{{/if}}
        [] check the name of each input

});



[] Delete "SOMETHING"
    [] play service - update with NEW NAME
    [] playController 




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

