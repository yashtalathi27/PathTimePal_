// const User = require("../database/freel.model.js");
// const jobSeeker=require("../model/freelancer.js");
const { jobSeekers } = require("../model/freelancer.js");

const Message = require("../database/message.model.js");
const { getRecieverSocketId, io } = require("../lib/socketio.js");

const getusersforsidebars  = async (req, res) => {
  try {
    const userid = req.params.uid;
    const filterusers = await jobSeekers.find({ _id: { $ne: userid } }).select("-password");
    console.log(filterusers);

    res.status(200).json(filterusers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getmessage = async (req, res) => {
  try {
    const { id: senderid, rid: usertochat } = req.params;
    const messages = await Message.find({
      $or: [
        { senderid: senderid, recieverid: usertochat },
        { senderid: usertochat, recieverid: senderid },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const sendmessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { sid: senderid, rid: recieverid } = req.params;
    const newmessage = new Message({ senderid, recieverid, text });
    await newmessage.save();

    const recieverSocketId = getRecieverSocketId(recieverid);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newmessage);
    }

    res.status(201).json(newmessage);
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getusersforsidebars,
  getmessage,
  sendmessage
};
