in authController.js


            const ctx = {
                errors:,
                userData:{
                    username: req.body.username
                }
            };


to be:


            const ctx = {
                errors:err.message,
                userData:{
                    username: req.body.username
                }
            };

___________________________________________________________

    if (!user) {
        throw new Error('No such user');
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if(!hasMatch) {
        throw new Error('Incorect password');
    }

    return generateToken(user)

to be:

    if (!user) {
        const err = new Error('No such user');
        err.type = 'credential';
        throw err;
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if(!hasMatch) {
        const err =  new Error('Incorect password');
        err.type = 'credential';
        throw err;
    }

    return generateToken(user)
________________________________________________
in middlewares / auth. js

 async register(username, password) {
                const token = await register(username, password);
                res.cookies(COOKIE_NAME, token);
            },
            async login(username, password) {
                const token = await login(username, password);
                res.cookies(COOKIE_NAME, token)

to be:
 async register(username, password) {
                const token = await register(username, password);
                res.cookie(COOKIE_NAME, token);
            },
            async login(username, password) {
                const token = await login(username, password);
                res.cookie(COOKIE_NAME, token)

_________________________________________________

function parseToken(req,res){
    const token = req.cookies[COOKIE_NAME];
    if (token) {
        try{
            const userData = jwt.veryfy(token, TOKEN_SECRET);
            req.user = userData;
        }catch(err){
            res.clearCookie(COOKIE_NAME);
            res.redirect('/auth/login');
    
            return false;
    
        }
    }
    return true;
}

to be:
function parseToken(req,res){
    const token = req.cookies[COOKIE_NAME];
    if (token) {
        try{
            const userData = jwt.veryfy(token, TOKEN_SECRET);
            req.user = userData;
            res.locals.user = userData;
        }catch(err){
            res.clearCookie(COOKIE_NAME);
            res.redirect('/auth/login');
    
            return false;
    
        }
    }
    return true;
}


_______________________________ add to the guard isUser() return
