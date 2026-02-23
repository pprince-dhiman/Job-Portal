import jwt from "jsonwebtoken";

export const isAuthenticated = async(req, res, next) => {
    try{
        const { token } = req.cookies;
        
        if(!token){
            return res.status(401).json({
                isTokenPresent : false,
                success: false,
                message: "Please Signup/Login."
            });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!payload){
            return res.status(401).json({
                success: false,
                message: "Please login again, Invalid token."
            });
        }
        
        req.id = payload.userId;
        next(); 
    }
    catch(err){
        res.status(400).json({success: false, message: err.message});
    }
}