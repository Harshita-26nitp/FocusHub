import { registerUserService } from "../services/auth.services.js";
import{loginUserService} from "../services/auth.services.js";
import env from "../config/env.js";

const authCookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/"
};

const setAuthCookie = (res, token) => {
    res.cookie(env.AUTH_COOKIE_NAME, token, {
        ...authCookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
};
export const registerUser=async(req,res)=>{
    try{
        const user=await registerUserService(req.body);
        res.status(200).json({
            success:true,
            message:"User registered successfully",
            data:user
        });

    }
    catch(error){
        res.status(401).json({
            success:false,
            message:error.message
        });
    }
};
export const loginUser=async(req,res)=>{
    try{
        const result=await loginUserService(req.body);
        setAuthCookie(res, result.token);
        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            data:{ user: result.user }
        });

    }
    catch(error){
        res.status(401).json({
            success:false,
            message:error.message,
        });
    }
};
export const logoutUser = async (_req,res)=>{
    res.clearCookie(env.AUTH_COOKIE_NAME, authCookieOptions);
    res.status(200).json({
        success:true,
        message:"User logged out successfully"
    });
};
export const getCurrentUser = async(req,res)=>{
    try {
       res.status(200).json({
            success:true,
            data:req.user
        });
    } 
    catch(error) {

        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
