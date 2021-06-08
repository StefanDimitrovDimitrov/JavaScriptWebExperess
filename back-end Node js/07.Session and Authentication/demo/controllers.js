module.exports = (app) => {

    app.all("*", (req, res, next)=>{

        if(req.url.includes('favicon') == false){
            console.log('>>>', req.method, req.url, req.body);
            console.log('>>> Session data', req.session);
        }
        next();
    })
    
    
    app.get('/', (req, res)=>{
        res.send('<h1>Welcome</h1> <a href="/">Home</a> <a href="/register">Register</a> <a href="/login">Login</a>')
    });
    
    
    app.get('/register', (req, res) => {
        res.send(`
        <h1>Register</h1> <a href="/">Home</a> <a href="/register">Register</a> <a href="/login">Login</a>
        <form action="/register" method="POST">
        <label>Username: <input type="text" name="username"></label>
        <label>Password: <input type="password" name="password"></label>
        <label>Repeat: <input type="password" name="repapss"></label>
        <input type="submit" value="Register">
        </form>
        `);
    });
    
    app.get('/login', (req, res) => {
        res.send(`
        <h1>Login</h1> <a href="/">Home</a> <a href="/register">Register</a> <a href="/login">Login</a>
        <formd action="/login" method="POST">
        <label>Username: <input type="text" name="username"></label>
        <label>Password: <input type="password" name="password"></label>
        <input type="submit" value="Login">
        </form>
        `);
    });
    
};

