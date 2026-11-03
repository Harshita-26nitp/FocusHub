import onlineUsers from "./onlineUsers.js";

export const registerRoomSocket = (io) => {
    io.on("connection", (socket) => {
        socket.joinedRooms = new Set();
        console.log(`${socket.user.fullName} connected`);

        socket.on("join-room", (roomId) => {
            if (!roomId) return;
            socket.join(roomId);
            socket.joinedRooms.add(roomId);

            if (!onlineUsers.has(roomId)) onlineUsers.set(roomId, []);
            const users = onlineUsers.get(roomId);
            const userId = String(socket.user._id);
            const existingUser = users.find((user) => String(user.userId) === userId);

            if (existingUser) {
                existingUser.socketIds = [...new Set([...(existingUser.socketIds || []), socket.id])];
                existingUser.socketId = existingUser.socketIds[0];
            } else {
                users.push({ socketId: socket.id, socketIds: [socket.id], userId: socket.user._id, fullName: socket.user.fullName });
                socket.to(roomId).emit("user-online", { userId: socket.user._id, fullName: socket.user.fullName });
            }

            socket.emit("online-users", users.map(({ socketIds, ...user }) => user));
        });

        socket.on("disconnect", () => {
            socket.joinedRooms.forEach((roomId) => {
                const users = onlineUsers.get(roomId);
                if (!users) return;
                const userIndex = users.findIndex((user) => (user.socketIds || [user.socketId]).includes(socket.id));
                if (userIndex === -1) return;
                const user = users[userIndex];
                user.socketIds = (user.socketIds || [user.socketId]).filter((socketId) => socketId !== socket.id);
                if (user.socketIds.length) {
                    user.socketId = user.socketIds[0];
                } else {
                    users.splice(userIndex, 1);
                    socket.to(roomId).emit("user-offline", { userId: user.userId, fullName: user.fullName });
                }
                if (!users.length) onlineUsers.delete(roomId);
            });
            console.log(`${socket.user.fullName} disconnected`);
        });
    });
};
