const http = require('http');
const router = require('./router');

router.registerHandler('/', (req, res) => {
    res.write(homePage)
    res.end();
})

const port = 3000
const server = http.createServer(requestHandler)

const homePage = `
<html>
<body>
    <div>
    <p>Welcome to my Page</p>
    </div>

</body>
</html>
`


function requestHandler(req, res) {
    console.log('>>>', req.method, req.url);
    const handler = router.match(req.url);
    handler(req, res);
}

server.listen(port, () => console.log('Server listenning on port ' + port));