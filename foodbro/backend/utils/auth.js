const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretkey = process.env.JWT_SECRET;

exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role
    },
    secretkey,
    { expiresIn: "7d" }
  );
};
exports.verifyToken=(token)=>{
    try{
        return jwt.verify(token, secretkey);
    }catch(err){
        throw new Error("Invalid token");
    }
 
}
