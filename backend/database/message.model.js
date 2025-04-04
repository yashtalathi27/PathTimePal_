import mongoose from "mongoose";
const messageSchema=new mongoose.Schema(
    {
        senderid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        }
        ,recieverid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        }
        ,text:{
            type:String,
        },
        image:{
            type:String,
        }
    },
    {timestamps:true}
);
const Message=mongoose.model("Message",messageSchema);
export default Message;