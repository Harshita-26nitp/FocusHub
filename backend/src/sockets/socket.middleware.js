import jwt from "jsonwebtoken";
import User from "../models/User.js";
import env from "../config/env.js";

const socketAuthMiddleware = async (socket, next) => {

    try {

        const token = socket.handshake.headers.cookie
            ?.split(";")
            .map((cookie) => cookie.trim())
            .find((cookie) => cookie.startsWith(`${env.AUTH_COOKIE_NAME}=`))
            ?.split("=")[1];

        if (!token) {
            return next(new Error("Authentication failed"));
        }


        const decoded = jwt.verify(
            token,
            env.JWT_SECRET
        );


        const user = await User.findById(
            decoded.userId
        ).select("-password");


        if (!user) {
            return next(new Error("User not found"));
        }


        socket.user = user;


        next();


    } catch (error) {

        next(new Error("Invalid token"));

    }

};


export default socketAuthMiddleware;
