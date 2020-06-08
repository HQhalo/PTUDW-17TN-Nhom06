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
router.get('/thuthumuon',function(req,res,next){
  res.render("librarianBorrowing",{layout: "layoutLibrarian"});
});
router.get('/themsach',function(req,res,next){
  res.render("librarianAddBooks",{layout: "layoutLibrarian"});
});
router.get('/yeucaumua',function(req,res,next){
  res.render("librarianBuy",{layout: "layoutLibrarian"});
});
router.get("/trasach",function(req,res,next){
  res.render("librarianGiveBack",{layout:"layoutLibrarian"});
});
router.get('/propose',function(req,res,next){
  res.render("professorBookPropose",{layout:"layoutLibrarian"});
});
module.exports = router;
