const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const person = require('./models/person');

passport.use(new LocalStrategy(async(userName,passWord,done)=>{
    try{
        // console.log("get username and password" ,userName,passWord);
        const user = await person.findOne({username:userName});
        if(!user){
            return done(null,false,{message:"incorrect user name"})
        }
        const ispasswordMatch = await user.comparePassword(passWord)

        if(ispasswordMatch)
        {
            return done(null,user)
        }
        else{
            return done(null,false,{message:"incorrect password"})
        }


    }catch(err){
       return done(err)
    }
}))

module.exports=passport;