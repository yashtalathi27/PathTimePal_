const express = require("express");
const { postjobconn } = require("../controllers/postjobconn.controller.js");

const router = express.Router();

// ✅ Add :recid here to match frontend call
router.post('/', postjobconn);

module.exports = router;
