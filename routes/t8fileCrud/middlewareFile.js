const fs = require('fs');
const router = require('./routerFile');

const router = require("express").Router()

// check file exists otr not if not than create the empty file
router.use(function (req, res, next) {
    console.log("check file exists middleware")
    if (!fs.existsSync('userFile.json')) {
        fs.writeFileSync("userFile.json", "[]", function (err) {
            if (err) throw err;
        });
    }
    next();
});

router.get('/error',(req,res,next) =>{
    throw Error("Error ai he error ay hi he")
});

router.use(function errorHandler (err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500) 
    res.render('error', { error: err })
})



module.exports = router