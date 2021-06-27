const authController = require('../controllers/authController')
const hotelController = require('../controllers/hotelController')
const homeController = require('../controllers/homeController')

module.exports = (app)=> {
    app.use('/auth', authController);
    app.use('/hotels', hotelController);
    app.use('/', homeController)
}