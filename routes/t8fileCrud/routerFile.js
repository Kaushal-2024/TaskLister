const userApis = require("./userAPIS")

const router = require("express").Router()



router.get("/form", (req, res) => {
    console.log("form may jsy ce");
    res.render("./t8fileCrud/form")
});

router.post("/form", (req, res) => {
    userApis.addUser(req.body)
    res.redirect("/getAllUser")
});

router.get("/getAllUser", (req, res) => {
    const users = userApis.getAllUser();
    res.render("./t8fileCrud/allUserList", { users })
});

router.get("/userDetails/:userId", (req, res) => {

    // throw Error("Error ai he ai he  error ai he ")
    const user = userApis.getUserbyId(req.params.userId)
    res.render("./t8fileCrud/userDetails", { user })
})



//other routes..

module.exports = router

