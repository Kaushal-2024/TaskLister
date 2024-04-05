const jwt = require("jsonwebtoken");
const {logger} = require('./../logger')


function isLoggedIn(req, res, next){
    const token = req.cookies["token"];
    
    logger.info(`token : ${token}`);
  
    if (!token) {
      return res.redirect("/login");
    }
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    logger.info(`decode obj : " ${decoded}`)
    
  
    if (!decoded) {
      return res.redirect("/login");
    }
  
    // const sessionToken = req.cookies["session_token"];
  
    // if (!sessionToken) {
    //   return res.redirect('/login');
    // }
  
    // const currentUserSession = sessions[sessionToken];
  
    // if (!currentUserSession) {
    //  return res.redirect('/login');
    // }
  
    // if (currentUserSession.expiresAt < new Date()) {
    //   return res.redirect('/login');
    // }
    next()
}

module.exports = {
    isLoggedIn
}