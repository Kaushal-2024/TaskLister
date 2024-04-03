const sql = require("./sql-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// const sessions = {};

const loginGet = function (req, res, next) {
  res.render("login");
}

const loginPost =  async function (req, res, next) {
  let obj = JSON.parse(JSON.stringify(req.body));
  console.log("from mathi madel obj", obj);
  let reso = await sql.checkUserAndPass(obj);
  console.log("respon form sql", { reso });

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
    console.log("token", token);
    res.cookie("token", token, { expireIn: "1h" });

    // const decoded = jwt.verify(token,process.env.token_secret_key);
  }
  res.send({ reso });
}

const dashboard =  async function (req, res, next) {
  const token = req.cookies["token"];
  console.log("token", token);

  if (!token) {
    return res.redirect("/login");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log("decode obj", decoded);

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

  console.log("got to dashboard route");

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
  console.log("from confrim page", req.params.a_code);
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
 loginGet,loginPost,dashboard,regUserGet,regUserPost,confirmReg,getAllEmailId
}