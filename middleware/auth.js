const jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).send('Access denied.');
    }
    const tokenValue = token.split(' ')[1]; // Extract token value

    try {
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        console.log('Error during token verification:', ex.message);
        res.status(400).send('Invalid token');
    }
};
