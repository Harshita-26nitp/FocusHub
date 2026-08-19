import {createMessageService} from "../services/message.service.js";
export const registerChatSocket=(io)=>{
    io.on("connection",(socket)=>{
        socket.on("send-message",async({roomId,content})=>{
            try{
                const message=await createMessageService(roomId,socket.user,content);
                io.to(roomId).emit("new-message",message);

            }
            catch(error){
                socket.emit("message-error",{
                   message:error.message
                });
            }

        });
    });
};