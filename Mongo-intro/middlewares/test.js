function mymiddleware(request, response, next) {
    console.log("Middleware is called!");
    next();
  }
  
  module.exports = mymiddleware;