const express = require("express");
const router = express.Router();
const { pageDepan, shortlink } = require("./Controller.js");

router.get("/belum-login", pageDepan);
router.get("/:shorturl", shortlink);
module.exports = router;
