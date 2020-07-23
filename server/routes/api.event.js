var express = require('express');
var router = express.Router();
var Event = require('../dal/database.event');
const app = require('../app');

/* GET all Events. */
router.get('/', function(req, res, next) {
    Event.getAllEvents()
    .then((events)=>{
      res.json(events);
    })
    .catch((error)=>{
      res.json(error);
    })

});

/* GET one event. */
router.get('/get/:id', function(req, res, next) {
    const id = req.params.id;
    if(id===undefined || id == null ){
        res.sendStatus(400); // Unprocessable entity
        return;
    }
    Event.getEvent(id)
      .then((event)=>{
        res.json(event);
      })
      .catch((error)=>{
          // Assume not found
        res.json(error);
      })
  });


module.exports = router;
