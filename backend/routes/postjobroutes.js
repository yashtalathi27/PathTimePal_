const express = require("express");
const { postjobconn ,getjobs,getusers} = require("../controllers/postjobconn.controller.js");

const router = express.Router();

// ✅ Add :recid here to match frontend call
router.post('/', postjobconn);
// router.get('/:id', getjobs);
router.get('/:id',getusers);

module.exports = router;
