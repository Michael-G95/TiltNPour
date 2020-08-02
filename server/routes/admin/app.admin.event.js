var express = require('express');
var router = express.Router();
const Event = require('../../dal/database.event');
const checkAuthenticated = require('./checkAuthenticated');
const moment = require('moment')

router.get('/', checkAuthenticated, (req,res,next)=>{
    Event.getAllEvents()
        .then((events)=>{
            res.render('admin/event/admin_event', {events});
        })
        .catch((err)=>{
            res.sendStatus(503);
        })
})

router.get('/edit/:id',checkAuthenticated,(req,res,next)=>{
    Event.getEvent(req.params.id)
    .then((events)=>{
        console.log(events);
        if(events.length > 0) {
            let event = events[0];
            event.ymdDate = moment(event.date).format('YYYY-MM-DD'); 
            res.render('admin/event/admin_edit_event', {event});
        }
        else
            res.sendStatus(404);
    })
    .catch((err)=>{
        res.sendStatus(503);
    })
})

router.post('/edit/:id', checkAuthenticated, async (req, res, next) => {
    console.log("Editing for id");
    const event = req.body;
    event.id = req.params.id;
    // Format to js date for consistency 
    event.date = new Date(event.date);

    try {
        Event.updateEvent(event)
            .then(() => {
                res.redirect('/admin/event');
            })
            .catch((err) => {
                console.log("Caught in .catch")
                res.status(500).json({ error: err });
            })
    }
    catch (err) {
        console.log("Caught try")
        res.status(500).json({ error: err });
    }

})


router.get('/new',checkAuthenticated,(req,res,next)=>{
    res.render("admin/event/admin_new_event");
})

router.post('/new', checkAuthenticated, async (req, res, next) => {
    console.log("new event");
    const event = req.body;
    // Format to js date for consistency 
    event.date = new Date(event.date);

    try {
        Event.insertEvent(event)
            .then((event) => {
                res.redirect(`/admin/event/`);
            })
            .catch((err) => {
                console.log("Caught in .catch")
                res.status(503).json({ error: err });
            })
    }
    catch (err) {
        console.log("Caught try")
        res.status(500).json({ error: err });
    }

})


router.delete('/:id',checkAuthenticated,(req,res,next)=>{
    console.log("Deleting event");
    Event.deleteEvent({id:req.params.id})
    .then(()=>{
        res.redirect("/admin/event");
    })
    .catch((err)=>{
        res.status(503).send({err});
    })
})



module.exports = router;