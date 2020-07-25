var express = require('express');
var router = express.Router();
var Message = require('../dal/database.message');
const app = require('../app');

router.post('/new', function (req, res, next) {

    // Try to parse date value from string timestamp
    try {
        req.body.timestamp = new Date(req.body.timestamp);
    }
    catch (ex) {
        res.status(400).json({ error: "timestamp not a date" });
        return;
    }

    try {
        // check for client sending string "true" rather than bool value true and try to parse it
        console.log(req.body.confirmed === 'true');
        if (typeof req.body.confirmed !== "boolean") {
            if (req.body.confirmed === 'true'){
                req.body.confirmed === true;
            }
            else if (req.body.confirmed === 'false'){
                req.body.confirmed === false;
            }
            else {
                // 422 Unprocessable entity
                res.status(422).json({ error: "confirmed not a bool or parsable as bool" });
                return;
            }
        }
    }
    catch (ex) {
        // 422 Unprocessable entity
        res.status(422).json({ error: "confirmed not a bool or parsable as bool" });
        return;
    }

    // Run validation on the message object values
    if (Message.validateMessage(req.body)) {
        Message.insertMessage(req.body)
            .then(() => {
                // 201 created
                res.sendStatus(201);
            })
            .catch((err) => {
                // 500 internal server error - could not create in database
                res.status(500).json({error:"unable to save message to database. please try again later."});
            })
    } else {
        // 422 Unprocessable entity
        res.status(422).json({error:"validation failed for message"});
    }
})


module.exports = router;
