const getAllPost =  function(req, res, next) {
  res.render('./t16jsonpl/allPosts',{  url :process.env.URL});
}


const getPostById =  function(req, res, next) {
  res.render('./t16jsonpl/postDetails');
}


module.exports = {
  getAllPost,getPostById
}
