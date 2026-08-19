import {getRoomMessageService} from "../services/message.service.js";
export const getRoomMessages=async(req,res)=>{
    try{
        const messages=await getRoomMessageService(req.params.roomId,req.user);
        res.status(200).json({
            success:true,
            message:"Messages fetched successfully",
            data:messages
        });
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};