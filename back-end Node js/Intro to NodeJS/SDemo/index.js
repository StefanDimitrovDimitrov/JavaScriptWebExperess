const http = require('http');
const router = require('./router');
const homeController = require('./controllers/homeController')
const catalogControler = require('./controllers/catalogController')
const aboutController = require('./controllers/aboutController')


router.registerHandler('/', homeController);
router.registerHandler('/catalog', catalogControler);
router.registerHandler('/about', aboutController);

const port = 3000
const server = http.createServer(requestHandler)

function requestHandler(req, res) {
    console.log('>>>', req.method, req.url);
    const handler = router.match(req.url);
    handler(req, res);
}

server.listen(port, () => console.log('Server listenning on port ' + port));