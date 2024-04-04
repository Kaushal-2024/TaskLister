const userApis = require("./userAPIS")
const {logger} = require('./../../logger')

const formGet = (req, res) => {
    logger.info("form may jsy ce");
    res.render("./t8fileCrud/form")
}

const formPost = (req, res) => {
    userApis.addUser(req.body)
    res.redirect("/getAllUser")
}

const getAllUser =  (req, res) => {
    const users = userApis.getAllUser();
    res.render("./t8fileCrud/allUserList", { users })
}

const getOneUserDetailByID =  (req, res) => {
   
    const user = userApis.getUserbyId(req.params.userId)
    res.render("./t8fileCrud/userDetails", { user })
}


module.exports = {
    formGet,formPost,getAllUser,getOneUserDetailByID
}

