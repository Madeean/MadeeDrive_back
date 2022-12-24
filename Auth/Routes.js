const express = require("express");
const { register, login, logout } = require("./Controller.js");
const router = express.Router();

const { cekLogin } = require("../Middleware");

router.post("/register", register);
router.post("/login", login);
router.use(cekLogin);
router.post("/logout", logout);

module.exports = router;
