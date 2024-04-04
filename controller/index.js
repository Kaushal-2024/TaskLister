const sql = require("./sql-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {logger} = require('./../logger')


// const sessions = {};

const logOut = function (req, res, next) {
    res.clearCookie('token')
    res.redirect("/login");
}


const loginGet = function (req, res, next) {
  res.render("login");
}

const loginPost =  async function (req, res, next) {
  let obj = JSON.parse(JSON.stringify(req.body));
 logger.info("from mathi madel obj", obj);
  
  
  let reso = await sql.checkUserAndPass(obj);
 logger.info("respon form sql", { reso });

  if (reso == "done") {
    // const sessionToken = uuid.v4();
    // const expiresAt = new Date().setFullYear(new Date().getFullYear() + 1);
    // sessions[sessionToken] = {
    //   expiresAt,
    //   userId: obj.email,
    // };

    // res.cookie("session_token", sessionToken, { maxAge: expiresAt });

    // const token = jwt.sign({ userId: obj.email}, 'jwt_secret', { expiresIn: '1h' });
    // res.cookie(token);

    const token = jwt.sign({ userId: obj.email }, process.env.JWT_SECRET_KEY);
   logger.info("token", token);
    res.cookie("token", token, { expireIn: "1h" });

    // const decoded = jwt.verify(token,process.env.token_secret_key);

    
  }
  res.send({ reso });
}

const dashboard =  async function (req, res, next) {
 
 logger.info("got to dashboard route");

  res.render("dashboard");
}

const regUserGet =  function (req, res, next) {
  res.render("form");
}

const regUserPost =  async function (req, res, next) {
  let obj = JSON.parse(JSON.stringify(req.body));

  let activation_code = await sql.insertUser(obj);

  res.send({ activation_code });
}

const confirmReg = async function (req, res, next) {
 logger.info("from confrim page", req.params.a_code);
  let checkeTime = await sql.isCodeActivated(req.params.a_code);

  if (checkeTime) {
    sql.updateStates(req.params.a_code);
    res.render("regConfirm");
  } else {
    res.redirect("/regUser");
  }
}

const getAllEmailId = async function (req, res, next) {
  let allEmail = await sql.getAllEmail();
  res.send(JSON.parse(JSON.stringify(allEmail)));
}

module.exports = {
    logOut,loginGet,loginPost,dashboard,regUserGet,regUserPost,confirmReg,getAllEmailId
}