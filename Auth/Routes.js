const express = require("express");
const { register, login } = require("./Controller.js");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
