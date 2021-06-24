const NEWService = require('../services/newMODEL');

module.exports = () => (req,res,next) => {

    req.storage = {
        ...NEWService
    };

    next()
}