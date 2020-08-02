var express = require('express');
var router = express.Router();
var articleRouter = require("./app.admin.article");
var userRouter = require("./app.admin.user");
var eventsRouter = require('./app.admin.event');
var messageRouter = require('./app.admin.message');
var breweryRouter = require('./app.admin.brewery')
const checkAuthenticated = require('./checkAuthenticated');


router.use("/article", articleRouter);
router.use("/user", userRouter);
router.use("/event", eventsRouter);
router.use("/message", messageRouter);
router.use("/brewery", breweryRouter);

router.get('/', checkAuthenticated, (req, res, next) => {
    console.log(req.user);
    res.render('admin/admin_home', { username: req.user.username });
})

router.get('*', checkAuthenticated, (req, res, next) => {
    res.redirect('/admin')
})

module.exports = router;
