import passport from "passport";
import User from "../models/User.js";
import bcrypt from "bcryptjs"; // diubah menjadi bcryptjs

export default {
    registerUser: async(req,res)=>{
        try {
            const hashedPw = bcrypt.hashSync(req.body.password, 10);
            if(req.body.username.trim() === "" || req.body.password.trim() === ""){ 
                res.status(400).json({message: "Fields Cannot Empty"})
            } else {
                const newUser = await User.create(
                    {
                        username: req.body.username,
                        password: hashedPw,
                        email: req.body.email,
                    }
                )
                res.status(200).json({message: "Create User Successfull", newUser})
            }
        } catch (error) {
            const dataErr = error.errors[0].message || error.message
            res.status(400).json({message: dataErr}); 
        }
    },
    loginUser: (req,res,next)=>{
        passport.authenticate('local', (err,user,info)=>{
            if(err){
                console.log(err.message);
                return next(err);
            }
            if(!user){
                return res.status(401).json({error: info.message});
            }
            req.login(user, (err)=>{
                if(err){
                    console.log(err);
                    return next(err);
                } else {
                    const {id, username} = user
                    const data = {id, username}
                    return res.status(200).json({...data, message: "Login Successfull"});
                }
            })
        })(req,res,next);
    },
    logoutUser: (req,res, next)=>{
        req.logout((err)=>{
            if(err){
                return next(err);
            } else {
                res.clearCookie('connect.sid')
                req.session.destroy()
                res.status(200).json({message: "Logout Successfull"})
            }
        })
    },
    cekAuth: (req,res, next)=>{
        if(req.isAuthenticated()){
            res.status(201).json({isAuthenticated: true})
        } else {
            res.status(201).json({isAuthenticated: false})
        }
    }
}