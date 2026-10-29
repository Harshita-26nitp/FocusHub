import jwt from "jsonwebtoken";
import env from "../config/env.js";
export const generateToken=(userId) => {
    return jwt.sign({userId},env.JWT_SECRET,{
        expiresIn:"7d"
    });
};
//after authentication we generate a token to take us to the frontend