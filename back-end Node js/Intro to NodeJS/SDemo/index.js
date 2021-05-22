const http = require('http');


const router = require('./router');
const homeController = require('./controllers/homeController')
const catalogControler = require('./controllers/catalogController')
const aboutController = require('./controllers/aboutController');
const createControler = require('./controllers/createControler');
const deleteControler = require('./controllers/deleteControler');


router.get('/', homeController);
router.get('/catalog', catalogControler);
router.get('/about', aboutController);
router.get('/create', createControler);
router.get('/delete', deleteControler);

const port = 3000
const server = http.createServer(requestHandler)

function requestHandler(req, res) {
    const url = new URL(req.url, 'http://localhost') 
    console.log('>>>', req.method, req.url);
    const handler = router.match(req.method, url.pathname);
    handler(req, res);
}

server.listen(port, () => console.log('Server listenning on port ' + port));