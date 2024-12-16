// const { verifyToken } = require("../utils/auth");

// const checkAuth = async (req, res, next) => {
//     const cookieToken = req.cookies.token;

//   const headerToken = req.headers.authorization;
//   const token = cookieToken || headerToken;

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

  
//   const decoded = verifyToken(token);
//   req.user = decoded;
//   next();
  

// };

// module.exports = checkAuth;
