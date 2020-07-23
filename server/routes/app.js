var express = require('express');
const path = require("path");

var router = express.Router();

// Handles any requests that don't match the ones above
router.get('*', (req,res) =>{
  res.sendFile(path.join(global.__basedir, "public", "index.html"));
});
 
module.exports = router;
