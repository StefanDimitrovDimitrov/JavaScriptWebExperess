const authController = require('../controllers/authController')
const NEWController = require('../controllers/NEW_MODLEController')
const homeController = require('../controllers/homeController')

module.exports = (app)=> {
    app.use('/auth', authController);
    app.use('/new', NEWController);
    app.use('/', homeController)
}