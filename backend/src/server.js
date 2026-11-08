import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/db.js";
import {createServer} from "http";
import {Server} from "socket.io";
import socketAuthMiddleware from "./sockets/socket.middleware.js";
import {registerRoomSocket} from "./sockets/room.socket.js";
import {registerChatSocket} from "./sockets/chat.socket.js";
const startServer=async()=>{
    try{
         await connectDB();
        const httpServer=createServer(app);
        const io=new Server(httpServer,{
            cors:{
                origin:["http://localhost:5173", "http://127.0.0.1:5173"],
                credentials:true
            }
        });
       
      io.use(socketAuthMiddleware);
         registerRoomSocket(io);
         registerChatSocket(io);
    
        httpServer.listen(env.PORT,()=>{
            console.log(`Server running on http://localhost:${env.PORT}`);

        });
    }
    catch(error){
        console.error(error);
        process.exit(1);
    }
};
startServer();
