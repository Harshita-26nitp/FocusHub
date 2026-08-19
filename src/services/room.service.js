import Room from "../models/Room.js";
export const createRoomService=async(roomData,user)=>{
    const {name,description,subject,maxParticipants,isPrivate}=roomData;
    const room=await Room.create({
        name,
        description,
        subject,
        host:user._id,
        participants:[user._id],
        maxParticipants,
        isPrivate
    });
    return room;
};
export const getAllRoomService = async () => {
    const room = await Room.find(
        { isPrivate: false },
        "name description subject maxParticipants participants isSessionActive"
    ).populate("host", "fullName");

    return room;
};
export const joinRoomService=async(roomId,user)=>{
          const room=await Room.findById(roomId);
          if(!room){
            throw new Error ("Room not found");
          }
          const alreadyJoined=room.participants.some((participant)=>participant.equals(user._id));
          if(alreadyJoined){
            throw new Error("You have already joined this room");
          }
          if(room.participants.length>=room.maxParticipants){
            throw new Error("Room is full");
          }
          room.participants.push(user._id);
          await room.save();
          return room;

};

export const leaveRoomService = async (roomId, user) => {
    const room = await Room.findById(roomId);

    if (!room) {
        throw new Error("Room not found");
    }

    const isParticipant = room.participants.some(
        participant => participant.equals(user._id)
    );

    if (!isParticipant) {
        throw new Error("You are not a participant of this room");
    }
        room.participants = room.participants.filter(
        participant => !participant.equals(user._id)
       
    );
   if(room.host.equals(user._id)){
   
     if(room.participants.length==0){
      
          await room.deleteOne();
          return null;
     }
     else{
          room.host=room.participants[0];
     }
     
   }
   




    await room.save();

    return room;
};

export const getRoomDetailsService=async(roomId)=>{
    const room=await Room.findById(roomId).populate("host","fullName username email").populate("participants","fullName username");
    if(!room){
        throw new Error("Room not found");
    }
     return room;
}
export const updateRoomService=async(roomId,user)=>{
    const room=await Room.findById(roomId);
    if(!room){
        throw new Error("Room not found");
    }
    if(!room.host.equals(user._id)){
          throw new Error("Only the host can update this room");
    }
    room=req.body;
     
    return room;
}

export const deleteRoomService=async(roomId,user)=>{
     const room=await Room.findById(roomId);
     if(!room){
        throw new Error("Room not found");
     }
     if(!room.host.equals(user._id)){
        throw new Error("Only the host can delete the room");
     }
     await room.deleteOne();
     return room;
}
export const getMyRoomsService=async(user)=>{
   const room=await Room.find({
    participants:{
        $in:[user._id]
    }
   });
   return room;
}
