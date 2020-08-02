var express = require('express');
var router = express.Router();
const Message = require('../../dal/database.message');
const checkAuthenticated = require('./checkAuthenticated');
const moment = require('moment')

router.get('/', checkAuthenticated, (req,res,next)=>{
    Message.getAllMessages()
        .then((messages)=>{
            res.render('admin/message/admin_message', {messages});
        })
        .catch((err)=>{
            res.sendStatus(503);
        })
})

router.get('/:id',checkAuthenticated,(req,res,next)=>{
    Message.getMessage(req.params.id)
    .then((messages)=>{
        console.log(messages);
        if(messages.length > 0) {
            res.render('admin/message/admin_view_message', {message:messages[0]});
        }
        else
            res.sendStatus(404);
    })
    .catch((err)=>{
        console.log(err);
        res.sendStatus(503);
    })
})

router.delete('/:id',checkAuthenticated,(req,res,next)=>{
    console.log("Deleting message");
    Message.deleteMessage({id:req.params.id})
    .then(()=>{
        res.redirect("/admin/message");
    })
    .catch((err)=>{
        res.status(503).send({err});
    })
})



module.exports = router;