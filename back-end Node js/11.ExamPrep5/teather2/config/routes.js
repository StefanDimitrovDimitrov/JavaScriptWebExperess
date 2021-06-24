const authController = require('../controllers/authController')

const NEWController = require('../controllers/NEW_MODLEController')

module.exports = (app)=> {
    app.use('/auth', authController);
    app.use('/new', NEWController);
}