const express = require("express");
const {
  getusersforsidebars,
  getmessage,
  sendmessage
} = require("../controllers/message.controller");

const router = express.Router();

router.get("/users/:uid", getusersforsidebars);
router.get("/:id/:rid", getmessage);
router.post("/send/:sid/:rid", sendmessage);
 
module.exports = router;
