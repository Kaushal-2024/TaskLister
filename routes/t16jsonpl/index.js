var express = require('express');
var router = express.Router();

/* GET all posts. */
router.get('/posts', function(req, res, next) {
  res.render('./t16jsonpl/allPosts',{  url :process.env.URL});
});

// get post  by id
router.get('/posts/:postId', function(req, res, next) {
  res.render('./t16jsonpl/postDetails');
});

// default handler
router.get('*', function(req, res, next) {
  res.render('totleRegisteredRouts',{routes:router.stack});
});

module.exports = router;
