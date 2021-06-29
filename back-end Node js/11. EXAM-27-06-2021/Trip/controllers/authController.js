const router = require('express').Router();
const {body, validationResult } = require('express-validator')
const { isGuest } = require('../middlewares/guards');

router.get('/register',isGuest(), (req, res) =>{
    res.render('register');

});

router.post(
    '/register',
    isGuest(),
    body('email').isEmail().withMessage('Invalid email').bail(),
    body('gender'),
    body('password')
        .isLength({ min: 5 }).withMessage('Password must be at least 3 characters long').bail()
        .isAlphanumeric().withMessage('Password should consist only english letters and digits'),
    body('rePass').custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('Passwords don\t match');
        }
        return true;
    }),

    async (req, res) => {
        const { errors }  = validationResult(req);

        try{
            if(errors.length > 0){
                throw new Error(Object.values(errors).map(e => e.msg).join('\n'));
            }
            console.log(req.body);

            await req.auth.register(req.body.email, req.body.gender, req.body.password);

            res.redirect('/') //TODO change redirect location
        }catch(err) {
            console.log(err);
            const ctx = {
                errors:err.message.split('\n'),
                userData:{
                   email: req.body.email,
                   gender: req.body.gender
                }
                
            };

            res.render('register', ctx)
        }
    }
);

router.get('/login',isGuest(), (req, res) => {
    res.render('login')

});

router.post('/login',isGuest(), async (req, res) => {
    try {
        await req.auth.login(req.body.email, req.body.password);
        res.redirect('/') //TODO change redirect location
    } catch (err) {
        console.log(err.message);
        let errors = [err.message];
        if (err.type == 'credential'){
            errors = ['incorect email or password']
        }
        const ctx = {
            errors,
            userData: {
                email: req.body.email,
            }
        };
        res.render('login', ctx);
    }
});

router.get('/logout', (req, res)=>{
    req.auth.logout();
    res.redirect('/');
})



module.exports = router;