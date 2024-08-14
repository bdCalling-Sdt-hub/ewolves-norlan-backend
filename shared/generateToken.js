const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        { _id: user._id, role: user.role },
            process.env.JWT_SECRET,
        {
            expiresIn: "3d",
        }
    );
};

module.exports = generateToken;