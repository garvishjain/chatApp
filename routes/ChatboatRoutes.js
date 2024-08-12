"use strict";

const express = require("express");

const router = express.Router();

const ChatBoatController = require("../controller/ChatboatController");

router.get('/',ChatBoatController.chatboat);
router.post("/register",ChatBoatController.register)


module.exports = router;