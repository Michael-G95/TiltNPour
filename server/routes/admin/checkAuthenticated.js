module.exports = function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/authenticate/login');
    }
}
