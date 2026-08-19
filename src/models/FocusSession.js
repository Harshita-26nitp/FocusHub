import mongoose from "mongoose";
const focusSessionSchema=new mongoose.Schema({
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    duration:{
        type:"Number",
        required:true,
        default:25
    },
    startTime:{
        type:Date,
        required:true,
        default:Date.now
    },
    endTime:{
        type:Date,
        default:null
    },
    status:{
        type:String,
        enum:["ACTIVE","COMPLETED","CANCELLED"],
        default:"ACTIVE"
    }
},{
    timestamps:true
}
);
const FocusSession=mongoose.model("FocusSession",focusSessionSchema);
export default FocusSession;