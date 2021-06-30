const authController = require('../controllers/authController')
const tripController = require('../controllers/tripController')
const homeController = require('../controllers/homeController')

module.exports = (app)=> {
    app.use('/auth', authController);
    app.use('/trips', tripController);
    app.use('/', homeController)
}