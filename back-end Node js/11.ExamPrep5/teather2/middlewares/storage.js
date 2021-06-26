const PlayService = require('../services/play');

module.exports = () => (req,res,next) => {

    req.storage = {
        ...PlayService
    };

    next()
}