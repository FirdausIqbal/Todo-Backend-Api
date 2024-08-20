export const authenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    } else {
        res.status(403).json({error: "Unauthorize"});
    }
}

export const isAdminCheck = (req,res,next)=>{
    authenticatedUser(req,res, ()=>{
        if(req.user.isAdmin){
            return next();
        } else {
            res.status(403).json({message: "You cannot access this request!"})
        }
    })
}
