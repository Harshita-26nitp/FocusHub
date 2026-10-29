import User from "../models/User.js";
import bcrypt from "bcrypt";
import {generateToken} from"../utils/generateToken.js";
export const registerUserService =async(userData)=>{
    const{ fullName,username,email,password}=userData;
    const existingUser=await User.findOne({
        $or:[{email},{username}]
    });
    if(existingUser){
         throw new Error("User already exists");
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await User.create({
        fullName,
        username,
        email,
        password:hashedPassword
    });
    return user;
}
export const loginUserService=async(userData)=>{
    const {email,password}=userData;
    const user=await User.findOne({email});
    if(!user){
        throw new Error("Invalid email or password");

    }
    const isPasswordCorrect=await bcrypt.compare(
        password,
        user.password
    );
    if(!isPasswordCorrect){
        throw new Error("Invalid email or password");
    }
      const token=generateToken(user._id);
      return{
        user,
        token
      };

}