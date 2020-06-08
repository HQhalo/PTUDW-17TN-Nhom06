var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  
});
router.get('/thuthu',function(req,res,next){
  res.render("librarianSearch",{layout: "layout",username: "Cô Thủ Thư", librarian: true});
});
router.get('/thuthuadd',function(req,res,next){
  res.render("librarianAddAccount",{layout: "layout",username: "Cô Thủ Thư", librarian: true});
});
router.get('/thuthumuon',function(req,res,next){
  res.render("librarianBorrowing",{layout: "layout",username: "Cô Thủ Thư", librarian: true});
});
router.get('/themsach',function(req,res,next){
  res.render("librarianAddBooks",{layout: "layout",username: "Cô Thủ Thư", librarian: true});
});
router.get('/yeucaumua',function(req,res,next){
  res.render("librarianBuy",{layout: "layout",username: "Cô Thủ Thư", librarian: true});
});
router.get("/trasach",function(req,res,next){
  res.render("librarianGiveBack",{layout:"layout",username: "Cô Thủ Thư", librarian: true});
});
router.get('/propose',function(req,res,next){
  res.render("professorBookPropose",{layout:"layout",username: "Cô Thủ Thư", librarian: true});
});
module.exports = router;
