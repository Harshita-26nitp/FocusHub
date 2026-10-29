import { registerUserService } from "../services/auth.services.js";
import{loginUserService} from "../services/auth.services.js";
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
        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            data:result
        });

    }
    catch(error){
        res.status(401).json({
            success:false,
            message:error.message,
        });
    }
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