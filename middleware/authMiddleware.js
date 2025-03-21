const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // Ensure cookies exist
        if (!req.cookies || !req.cookies.auth_token) {
            req.user = null;
            return next();
        }

        const token = req.cookies.auth_token; // Extract token
        console.log(token,"test");

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to `req.user`
        req.user = decoded;
        
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        req.user = null; // Ensure `req.user` is null if token is invalid
    }

    next(); // Proceed to next middleware
};

module.exports = authMiddleware;
