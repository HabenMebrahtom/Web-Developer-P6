const jwt = require('jsonwebtoken');
require('dotenv/config');


const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return res.sendStatus(403)
    }

    try {

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;

    } catch (error) {
        return res.sendStatus(401);
    }

    return next();
}

module.exports = verifyToken