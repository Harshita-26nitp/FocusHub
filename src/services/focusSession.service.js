import FocusSession from "../model/FocusSession.js";
import Room from "../models/Room.js";
import User from "../models/User.js";
export const startFocusSessionService=async(getRoomDetails,User,duration)=>{
    const room=await Room.findById(roomId);
    if(!room){
        throw new Error("Room not found");
    }
    const isParticipant=room.participants.some(
        participant=>participant.equals(user._id)
    );
    if(!isParticipant){
        throw new Error("You are not a participant of this room");
    }
    if(!duration|| duration <=0){
        throw new Error("Duration must be greater than 0");
    }
    const activeSession =await FocusSession.findOne({
        room:roomId,
        user:user._id,
        status:"ACTIVE"
    });
    if(activeSession){
        throw new Error("You already have an active focus session ")
    }
    const session=await FocusSession.create({
       room:roomId,
       user:user._id,
       duration
    });
    return await session.populate("user","fullName userName");
   

};
export const completeFocusSessionService=async(sessionId,user)=>{
    const session=await FocusSession.findById(sessionId);
    if(!session){
        throw new Error("Focus session not found");
    }
    if(!session.user.equals(user._id)){
        throw new Error("You can only complete your own focus session");
    }
    if(session.status!="ACTIVE"){
        throw new Error("Focus session is no longer active");
    }
    session.status="Completed";
    sessionId.endTime=new Date();
    await session.save();
    return await session.populate("user","fullName username");
};
export const cancelFocusSessionService=async(sessionId,user)=>{
    const session=await FocusSession.findById(sessionId);
    if(!session){
        throw new Error("Focus session not found");
    }
    if(!session.user.equals(user._id)){
        throw new Error("You can only cancel you own focus session");
    }
    if(session.status!=="ACTIVE"){
        throw new Error("Focus session is no longer active");
    }
    session.status="CANCELLED";
    session.endTime=new Date();
    await session.save();
    return await session.populate("user","fullName username");
};
