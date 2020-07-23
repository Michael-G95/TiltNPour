var express = require('express');
var router = express.Router();
var Message = require('../dal/database.message');
const app = require('../app');

/* GET all Messages. */
router.get('/', function (req, res, next) {
    res.json({ message: "Function disabled. Nice try!" });

});

router.post('/new', function (req, res, next) {
    console.log(req.body);
    try {
        req.body.timestamp = new Date(req.body.timestamp);
    }
    catch (ex) {
        res.status(400).json({ error: "timestamp not a date" });
        return;
    }

    try {
        // this looks like awful code but apparently the best way to bool->date in js
        console.log(req.body.confirmed === 'true');
        if (typeof req.body.confirmed !== "boolean") {
            if (req.body.confirmed === 'true'){
                req.body.confirmed === true;
            }
            else if (req.body.confirmed === 'false'){
                req.body.confirmed === false;
            }
            else throw 'confirmed'
        }

    }
    catch (ex) {
        res.status(400).json({ error: "confirmed not a bool" });
        return;
    }
    if (Message.validateMessage(req.body)) {
        Message.insertMessage(req.body)
            .then(() => {
                res.sendStatus(201);
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    } else {
        res.status(400).json("Validation failed");
    }
})


module.exports = router;
