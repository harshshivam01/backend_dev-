 const jwt = require("jsonwebtoken");

 const JWT_SECRET="shi123";

 exports.getToken = ((user)=>{
     return jwt.sign({id: user._id, username: user.username}, JWT_SECRET, {expiresIn: "7d"});
 })

 exports.verifyToken = ((token)=>{
     try{
         return jwt.verify(token, JWT_SECRET);
     }catch(err){
         throw new Error("Invalid token");
     }
     
 })