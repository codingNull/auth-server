const passport = require('passport');
const User = require('../models/user');
const config = require('../controlers/config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local');


const localOption = {usernameField: 'email'};
const localLogin = new localStrategy(localOption, function(email,password,done){
    User.findOne({email:email},function(err,user){
        if(err) return done(err);
        if(!user) return done(null,false);
        user.comparePassword(password,function(err,isMatch){
            if(err) return done(err);
            if(!isMatch) return done(null,false);
            return done(null,user);
        });
    });
});



const jwtOption = {
    jwtFromRequest: ExtractJwt.fromHeader('authentication'),
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOption,function(payload,done){
    User.findById(payload.sub,function(err,user){
        if(err){
            return done(err,false)
        }
        if(user){
            done(null,user);
        }else {
            done(null,false);
        }
    });
});

passport.use(jwtLogin); 
passport.use(localLogin);


