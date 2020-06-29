var express = require('express');
var router = express.Router();
var Brewery = require('../dal/database.brewery');


/* GET all breweries. */
router.get('/', function(req, res, next) {
  Brewery.getAllBreweries()
    .then((breweries)=>{
      res.json(breweries);
    })
    .catch((error)=>{
      res.json(error);
    })
});

/* GET one brewery. */
router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    if(id===undefined || id == null ){
        res.sendStatus(400); // Unprocessable entity
        return;
    }
    Brewery.getBrewery(id)
      .then((brewery)=>{
        res.json(brewery);
      })
      .catch((error)=>{
          // Assume not found
        res.json(error);
      })
  });


module.exports = router;
