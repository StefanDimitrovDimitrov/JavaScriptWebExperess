const { about } = require('../controllers/about');
const { post: commentPost } = require('../controllers/comments');

const productController = require('../controllers/productController');
const accessoryController = require('../controllers/accessoryController')
const homeController = require('../controllers/homeController');

const { notFound } = require('../controllers/notFound');



module.exports = (app) => {

    app.get('/',);
    app.get('/about', about)

    app.use('/products', productController)
    app.use('/accessory', accessoryController)

    app.post('/comments/:cubeId/create', commentPost);
    
    app.use('/', homeController)
};