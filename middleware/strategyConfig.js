import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/User.js";
import bcrypt from 'bcrypt';

passport.use('local', 
    new Strategy(async(username, password, done)=>{
        try {
            const userData = await User.findOne({where: {username}});
            if(!userData){
                return done(null, false, {message: "Incorrect Username"});
            }
            const isMatch = await bcrypt.compare(password, userData.password);
            if(!isMatch){
                return done(null,  false, {message: "Incorrect Password"});
            } else {
                const {password , ...user} = userData.dataValues;
                return done(null, user);
            }
        } catch (error) {
            console.log(error);
            return done(error);
        }
    })
);

passport.serializeUser((user, done)=>{
    done(null, user);
});

passport.deserializeUser((user, done)=>{
    done(null,user);
});

export default passport;