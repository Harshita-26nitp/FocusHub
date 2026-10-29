import mongoose from "mongoose";
const taskSchema =new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
             trim:true
        },
        room:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Room",
            required:true

        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        assignedTo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:null
        },
        status:{
            type:String,
            enum:["TODO","IN_PROGRESS","DONE"],
            default:"TODO"
        },
        priority :{
            type:String,
            enum:["LOW","MEDIUM","HIGH"],
            default:"MEDIUM"
        }
    },{
        timestamps:true
    }
);
const Task=mongoose.model("Task",taskSchema);
export default Task;
