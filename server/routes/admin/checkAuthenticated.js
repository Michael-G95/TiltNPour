// Used as middleware to redirect any users not logged in to /authenticate/login to secure admin pages

module.exports = function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/authenticate/login');
    }
}
