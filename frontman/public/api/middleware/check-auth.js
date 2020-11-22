const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        // Splitting JWT form Bearer inside Headers to be able to verify
        const token = req.headers.authorization.split(" ")[1];
        // Verifying and decoding JWT for Authorization
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
}