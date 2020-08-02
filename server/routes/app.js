var express = require('express');
const path = require("path");

var router = express.Router();


// Routes to get css to allow proper previewing in admin window

router.get('/adm/css/common',(req,res)=>{
  console.log("CSSPATH: ",path.join(global.__basedir, "client","public", "css", "common.css"))
  res.sendFile(path.join(global.__basedir, "client","public", "css", "common.css"));
})

router.get('/adm/css/app',(req,res)=>{
  res.sendFile(path.join(global.__basedir, "client","public", "css", "app.css"));
})

router.get('/adm/css/home',(req,res)=>{
  res.sendFile(path.join(global.__basedir, "client","public", "css", "home.css"));
})
router.get('/adm/css/blog',(req,res)=>{
  res.sendFile(path.join(global.__basedir, "client","public", "css", "blog.css"));
})


// Handles any requests that don't match the ones above - serve react frontent
router.get('*', (req,res) =>{
  res.sendFile(path.join(global.__basedir, "client","build", "index.html"));
});
 
module.exports = router;
