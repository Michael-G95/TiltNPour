const app = require("../app");
const bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();
const User = require('../dal/database.user');
const initPassport = require ('./passportConfig')
const passport = require('passport');
const checkAuthenticated = require("./admin/checkAuthenticated");

// Const to set initial permissions on create user
const USER_INITIAL_PERMISSIONS = ["basic"];

// Set up passport
initPassport(passport);

router.get('/whoami', checkAuthenticated, (req, res, next) => {
    res.json({ username: req.user.username });
})

router.post('/adduser', checkAuthenticated, async (req, res, next) => {
    // Authenticate user has this permission
    console.log('adduser');
    try {
        // Check for existing user
        const user = await User.getUsername(req.body.username)
        if (user !== null && user !== undefined) {
            console.log("USER EXISTS");
            return res.render('admin/user/admin_new_user',{
                message:"User already exists"
            })
            
        }

        // Generate fresh salt
        const salt = await bcrypt.genSalt();
        // Hash password using bcrypt with salt
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(hashedPassword)
        // Initial permissions "basic"

        await User.insertUser({
            username: req.body.username,
            hashedPassword,
            permissions: [
                "basic"
            ]
        })
        return res.redirect('/admin/user');

    }
    catch (err) {
        console.log(err.message)
        return res.render('admin/user/admin_new_user',{
            message:err.message
        })
    }
})

// Used below to redirect any user that is logged in
function checkNotAuthenticated (req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/admin')
    }else{
        return next();
    }
}

router.get('/login',checkNotAuthenticated,async (req,res,next)=>{
    res.render('admin/login/login');
})

router.post('/login',checkNotAuthenticated, passport.authenticate('local',{
    successRedirect:"/admin",
    failureRedirect:"/authenticate/login",
    failureFlash:true
}))

router.delete('/logout', (req,res,next)=>{
    if(req.isAuthenticated()){
        console.log("Logging out:",req.user.username)
        req.logout();
        req.session = null;
    }
    return res.redirect('/');
})

router.delete('/:id',checkAuthenticated,async (req,res,next)=>{
    if(req.params.id === req.user.id){
        console.log("User tried to delete himself");
        return res.redirect("/admin/user?message=You can't delete yourself")
    }
    try{
        await User.deleteUser({id:req.params.id});
        res.redirect('/admin/user');
    }catch(err){
        console.log("Deletion failed",err);
        res.redirect('/admin/user')
    }
})

router.get('*',checkAuthenticated,(req,res,next)=>{
    res.redirect('/admin')
})

module.exports = router;