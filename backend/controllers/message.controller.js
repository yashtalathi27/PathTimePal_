import User from "../database/user.model.js";
import Message from "../database/message.model.js"
import {getRecieverSocketId,io} from "../lib/socketio.js"
export const getusersforsidebars=async(req,res)=>{
    try{
        const userid=req.uid;
        const filterusers=await User.find({_id:{$ne:userid}}).select("-password");
        res.status(200).json(filterusers);
    }
    catch (err){
        console.log(err);
    }
}
export const getmessage = async (req, res) => {
    try {
        const { id: senderid, rid: usertochat } = req.params; // Extract both sender and receiver ID

        if (!senderid || !usertochat) {
            return res.status(400).json({ message: "Sender and receiver IDs are required" });
        }

        const messages = await Message.find({
            $or: [
                { senderid: senderid, recieverid: usertochat },
                { senderid: usertochat, recieverid: senderid }
            ]
        }).sort({ createdAt: 1 }); // Sort by oldest first for chat order
        console.log(messages)
        res.status(200).json(messages);
    } catch (err) {
        console.error("Error fetching messages:", err);
        res.status(500).json({ message: "Server Error" });
    }
};


export const sendmessage = async (req, res) => {
    try {
        console.log("Received message data:", req.body);

        const { text } = req.body;
        const { sid: senderid, rid: recieverid } = req.params; // Extract sender & receiver ID

        if (!text || !senderid || !recieverid) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newmessage = new Message({
            senderid,
            recieverid,
            text,
        });

        await newmessage.save();

        const recieverSocketId = getRecieverSocketId(recieverid);
        console.log("New message saved:", newmessage);

        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newmessage);
        }

        res.status(201).json(newmessage);
    } catch (err) {
        console.error("Error sending message:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

