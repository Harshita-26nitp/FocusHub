import mongoose from "mongoose";
const roomSchema=new mongoose.Schema({
      name:{
        type:String,
        required:true,
        trim:true
      },
      description:{
          type:String,
          default:""
      },
      subject:{
        type:String,
        enum:[
            "DSA",
            "Development",
            "Machine Learning",
            "Aptitude",
            "CS Fundamentals",
            "Other"
        ],
        default:"Other"
      },
      host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
      },
      participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    maxParticipants:{
        type:Number,
        default:25
    },
    isPrivate:{
        type:Boolean,
        default:false
    },
    inviteCode:{
        type:String,
        default:null
    },
    isSessionActive:{
        type:Boolean,
        default:false,
    }
}
,{
        timestamps:true
    }
);
const Room=mongoose.model("Room",roomSchema);
export default Room;