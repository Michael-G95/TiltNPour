const passport = require('passport')
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy
const User = require('../dal/database.user');

function initPassport(passport){
    passport.use(new LocalStrategy({usernameField:"username"},authenticateUser))

    passport.serializeUser((user,done)=>{
        // Serialise to id
        done(null, user.id)
    })

    passport.deserializeUser(async (id,done)=>{
        // Get the user from db
        var user = 
            User.getUserById(id)
            .then((user)=>{
                if(user !== null && user !== undefined){
                    return done(null, user)
                }else{
                    return done(null, false)
                }
            })
            .catch((error)=>{
               return done(error,false);
            })
        
        
    })
}

const authenticateUser = async (username,password,done) => {
    console.log("Authenticating")
    // Try to get used
    const user = await User.getUsername(username);
    console.log("User: ",user)
    // No user found - return
    if(user === null || user === undefined){
        console.log("No user found")
        return done(null,false,{message:"Username or password incorrect"});
    }

    try {
        if(await bcrypt.compare(password,user.hashedPassword)){
            console.log("Auth OK")
            // Authenticated
            return done(null,user)
        }else{
            console.log("Auth FAIL")
            // Bad password
            return done(null,false,{message:"Username or password incorrect"})
        }
    } catch (error) {
        done(error);
    }


}

module.exports = initPassport