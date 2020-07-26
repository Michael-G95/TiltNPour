var express = require('express');
var path = require('path');
var router = express.Router();
var User = require('../../dal/database.user');
var ejs = require('ejs');
const url = require('url');

const checkAuthenticated = require('./checkAuthenticated');

router.get('/', checkAuthenticated, async (req, res, next) => {

    // Checking for any passed messages
    var params = url.parse(req.url, true).query
    const users = await User.getAllUsers();
    console.log(params);
    if (params.message)
        return res.render('admin/user/admin_user', { users: users, message:params.message });
    else
        return res.render('admin/user/admin_user', { users: users, message:null });
})

router.get('/new', checkAuthenticated, async (req, res, next) => {
    res.render('admin/user/admin_new_user', {
        message: null
    });
})

module.exports = router;