const userApis = require("./userAPIS")

const router = require("express").Router()



router.get("/form", (req, res) => {
    console.log("form may jsy ce");
    res.render("./form")
});

router.post("/form", (req, res) => {
    userApis.addUser(req.body)
    res.redirect("/getAllUser")
});

router.get("/getAllUser", (req, res) => {
    const users = userApis.getAllUser();
    res.render("allUserList", { users })
});

router.get("/userDetails/:userId", (req, res) => {

    // throw Error("Error ai he ai he  error ai he ")
    const user = userApis.getUserbyId(req.params.userId)
    res.render("userDetails", { user })
})






// Basic routs for learning

router.get("/", (req, res) => {
    res.send("Hello World try different params like home, about, contact ")
});

router.get("/home/:uname", (req, res) => {
    res.render("home", { username: `${req.params.uname}` })
});

router.get("/about", (req, res) => {
    res.send("about page")
});

router.get("/contact", (req, res) => {
    res.send("contact page")
});



//other routes..

module.exports = router

