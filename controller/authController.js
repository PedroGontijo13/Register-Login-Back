const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const SECRET_KEY = process.env.SECRET_KEY; // Replace with your actual config path

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        req.user = user;
        next();
    });
};

// Validate user endpoint
const validateUser = (req, res) => {
    if (req.user) {
        res.json({ valid: true, user: req.user });
    } else {
        res.status(401).json({ valid: false, message: 'No user found' });
    }
};

module.exports = {
    authenticateToken,
    validateUser,
};
