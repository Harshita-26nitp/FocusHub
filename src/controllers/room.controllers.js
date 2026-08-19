import {createRoomService} from "../services/room.service.js";
import {getAllRoomService} from "../services/room.service.js";
import { joinRoomService } from "../services/room.service.js";
import {leaveRoomService} from "../services/room.service.js";
import {deleteRoomService} from "../services/room.service.js";
import {getMyRoomsService} from "../services/room.service.js";
import {
    getRoomDetailsService,
    updateRoomService
} from "../services/room.service.js";
export const createRoom=async(req,res)=>{
    try{
        const room=await createRoomService(req.body,req.user);
        res.status(201).json({
            success:true,
            message:"Room created successfully",
            data:room
        });
    }
     catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });

    }
};
export const getAllRooms=async(req,res)=>{
    try{
        const rooms=await getAllRoomService();
        res.status(200).json({
            success:true,
            data:rooms
        });


    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
export const joinRoom=async(req,res)=>{
    try{
        const room=await joinRoomService(req.params.roomId,req.user);

    
    res.status(200).json({
        success:true,
        message:"Joined room successfully",
        data:room
    });
}
catch(error){
    res.status(400).json({
        
            success:false,
            message:error.message
        });
  
}

};
export const leaveRoom=async(req,res)=>{
    try{
         const room=await leaveRoomService(req.params.roomId,req.user);
          res.status(200).json({
        success:true,
        message:"Left room successfully",
        data:room
    });
    }
    catch(error){
         res.status(400).json({
        
            success:false,
            message:error.message
        });
    }
};
export const getRoomDetails=async(req,res)=>{
        
            try{
                 const room= await getRoomDetailsService(req.params.roomId,req.user);
               res.status(200).json({
                success:true,
                message:"Room fetched successfully",
                data:room
            });
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
    
};
export const updateRoom=async(req,res)=>{
      
      try{
        const room=await updateRoomService(req.params.roomId,req.body,req.user);
        res.status(200).json({
            success:true,
            message:"Room updated",
            data:room

        });
      }
      catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
      }
};
export const deleteRoom=async(req,res)=>{
    try{
        const room=await deleteRoomService(
            req.params.roomId,
            req.user
        );
        res.status(200).json({
            success:true,
            message:"Room deleted successfully",
            data:room
        });
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};
export const getMyRooms=async(req,res)=>{
    try{
        const rooms=await getMyRoomsService(req.user);
        res.status(200).json({
            success:true,
            message:"My rooms fetched successfully",
            data:rooms
        });
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};