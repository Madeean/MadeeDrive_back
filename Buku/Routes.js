var express = require("express");
const {
  getAllBuku,
  tambahBuku,
  getBukuById,
  editBuku,
  deleteBuku,
} = require("./Controller.js");
const os = require("os");
const multer = require("multer");

const router = express.Router();

const { cekLogin } = require("../Middleware");

router.use(cekLogin);
router.get("/", getAllBuku);
router.post("/", multer({ dest: os.tmpdir() }).single("foto_buku"), tambahBuku);
router.get("/:id", getBukuById);
router.put("/:id", multer({ dest: os.tmpdir() }).single("foto_buku"), editBuku);
router.post("/delete/:id", deleteBuku);

module.exports = router;
