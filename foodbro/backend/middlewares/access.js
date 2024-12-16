
function giveAccess(roles = []) {
    return (req, res, next) => {
      const userRole = req.user.role;
      if (roles.includes(userRole)) {
        next();
      } else {
        res
          .status(403)
          .send({
            status: "failed",
            message: "Not allowed to access this route",
          });
      }
    };
  }
  
  module.exports = giveAccess;