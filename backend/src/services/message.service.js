import Message from "../models/Message.js";
import Room from "../models/Room.js";
export const createMessageService=async(roomId,User,content)=>{
    const room =await Room.findById(roomId);
    if(!room){
         throw new Error("Room Not Found");

    }
    const isParticipant=room.participants.some(
        participant=>participant.equals(User._id)
    );
    if(!isParticipant){
        throw new Error("You are not a participant of this room");

    }
    if(!content|| !content.trim()){
        throw new Error("Message cannot be empty");
    }
    const message=await Message.create({
        room:roomId,
        sender:User._id,
        content:content.trim()
    });
    return await message.populate(
        "sender",
        "fullName username"
    );
};
export const getRoomMessageService=async(roomId,user)=>{
    const room=await Room.findById(roomId);
    if(!room){
        throw new Error("Room not Found");

    }
    const isParticipant=room.participants.some(
        participant=>participant.equals(user._id)
    );
    if(!isParticipant){
        throw new Error("You are not a participant of this room");

    }
    const messages=await Message.find({
        room:roomId
    }).populate("sender","fullName username").sort({created:1});
    return messages;
}