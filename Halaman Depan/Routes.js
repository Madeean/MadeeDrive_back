const express = require("express");
const router = express.Router();
const { pageDepan } = require("./Controller.js");

router.get("/belum-login", pageDepan);
module.exports = router;
