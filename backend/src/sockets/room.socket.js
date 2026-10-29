import onlineUsers from "./onlineUsers.js";
export const registerRoomSocket=(io)=>{

    io.on("connection",(socket)=>{

        socket.joinedRooms=[];


        console.log(
            `${socket.user.fullName} connected`
        );


        socket.on("join-room",(roomId)=>{


            socket.join(roomId);

            socket.joinedRooms.push(roomId);


            if(!onlineUsers.has(roomId)){
                onlineUsers.set(roomId,[]);
            }


            const users=onlineUsers.get(roomId);


            const alreadyJoined=users.some(
                user=>user.socketId===socket.id
            );


            if(!alreadyJoined){

                users.push({
                    socketId:socket.id,
                    userId:socket.user._id,
                    fullName:socket.user.fullName
                });

            }


            socket.to(roomId).emit(
                "user-online",
                {
                    userId:socket.user._id,
                    fullName:socket.user.fullName
                }
            );


            socket.emit(
                "online-users",
                onlineUsers.get(roomId)
            );


        });



        socket.on("disconnect",()=>{


            socket.joinedRooms.forEach((roomId)=>{


                const users=onlineUsers.get(roomId);


                if(users){

                    const updatedUsers=
                    users.filter(
                        user=>user.socketId!==socket.id
                    );


                    if(updatedUsers.length===0){
                        onlineUsers.delete(roomId);
                    }
                    else{
                        onlineUsers.set(
                            roomId,
                            updatedUsers
                        );
                    }


                    socket.to(roomId).emit(
                        "user-offline",
                        {
                            userId:socket.user._id,
                            fullName:socket.user.fullName
                        }
                    );

                }

            });


            console.log(
                `${socket.user.fullName} disconnected`
            );

        });


    });

};