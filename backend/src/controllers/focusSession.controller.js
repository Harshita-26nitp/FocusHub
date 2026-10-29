import{startFocusSessionService,getRoomFocusSessionsService,completeFocusSessionService,cancelFocusSessionService} from "../services/focusSession.service.js";
export const startFocusSession=async(req,res)=>{
    try{
        const session=await startFocusSessionService(req.params.roomId,req.user,req.body.duration);
        res.status(201).json({
            success:true,
            message:"Focus session started successfully",
            data:session
        });
    }
    catch(error){
        res.status(400).json({
            sucess:false,
            message:error.message
        });
        
    }
};
export const getRoomFocusSessions=async(req,res)=>{
    try{
        const sessions=await getRoomFocusSessionsService(req.params.roomId,req.user);
        res.status(200).json({
            success:true,
            message:"Focus sessions fetched successfully",
            data:sessions
        });
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
}
    export const completeFocusSession=async(req,res)=>{
        try{
            const session=await completeFocusSessionService(req.params.sessionId,req.user);
            res.status(200).json({
                success:true,
                message:"Focus session completed successfully",
                data:session
            });
        }
        catch(error){
            res.status(400).json({
                success:false,
                message:error.message
            });
        }
    };
    export const cancelFocusSession=async(req,res)=>{
        try{
            const session=await cancelFocusSessionService(req.params.sessionId,req.user);
            res.status(200).json({
                success:true,
                message:"Focus session cancelled successfully",
                data:session
            });
        }
        catch(error){
            res.status(400).json({
                success:false,
                message:error.message
            });
        }
    }

