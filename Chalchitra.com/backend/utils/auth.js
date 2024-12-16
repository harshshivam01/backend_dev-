const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
     }, 
    process.env.JWT_SECRET, 
    { expiresIn: "30d" });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};


module.exports = { generateToken, verifyToken };
