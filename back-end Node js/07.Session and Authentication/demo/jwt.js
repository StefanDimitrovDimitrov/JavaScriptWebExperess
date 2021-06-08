const jwt = require('jsonwebtoken');

const payload = { message: 'HI!'};

const secret = 'my-secret-key';

const token = jwt.sign(payload, secret, {expiresIn: '2d' });

console.log(token);