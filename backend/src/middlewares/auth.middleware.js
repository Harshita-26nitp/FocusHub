import jwt from "jsonwebtoken";
import User from "../models/User.js";
import env from "../config/env.js";
const authMiddleware = async(req,res,next)=>{
    try {

        const authHeader=req.headers.authorization;
        const token = req.cookies?.[env.AUTH_COOKIE_NAME] ||
            (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            });
        }

        const decoded=jwt.verify(
            token,
            env.JWT_SECRET
        );

        const user=await User.findById(decoded.userId)
                             .select("-password");

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not found"
            });
        }

        req.user=user;

        next();

    } catch(error){

        res.status(401).json({
            success:false,
            message:"Invalid token"
        });

    }
};
export default authMiddleware;
