const jwt = require("jsonwebtoken");
const { getUserById } = require("../models/userModel");

// Protect middleware: verifies JWT and attaches user to req
exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.cookies && req.cookies.jwt) {
            token = req.cookies.jwt;
        } else if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "You are not logged in!",
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await getUserById(decoded.id);
        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "User no longer exists.",
            });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({
            status: "fail",
            message: "Invalid or expired token.",
        });
    }
};

// isAdmin middleware: checks if user is admin
exports.isAdmin = (req, res, next) => {
    //   if (!req.user || req.user.role !== 'admin') {
    //     return res.status(403).json({
    //       status: 'fail',
    //       message: 'You do not have permission to perform this action',
    //     });
    //   } else {
    //     return next();
    //   }
    //   next();
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.status(403).json({ message: 'Forbidden' });
};
