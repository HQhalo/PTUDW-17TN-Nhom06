var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  
});
router.get('/thuthu',function(req,res,next){
  res.render("librarianSearch",{layout: "layoutLibrarian"});
});
router.get('/thuthuadd',function(req,res,next){
  res.render("librarianAddAccount",{layout: "layoutLibrarian"});
});
module.exports = router;
