const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, client) => {
        if (err) return res.sendStatus(403);
        req.client = client;
        next();
    });
};

module.exports = authenticateToken;
