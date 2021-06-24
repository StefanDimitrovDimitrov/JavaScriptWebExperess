const playService = require('../services/Play');

module.exports = () => (req,res,next) => {
    req.storage = {
        ...playService
    };

    next();
}