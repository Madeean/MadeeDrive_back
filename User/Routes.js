const express = require("express");
const router = express.Router();
const {
  cekKonfirmasi,
  terimaKonfirmasi,
  tolakKonfirmasi,
} = require("./Controller.js");

const { cekLogin } = require("../Middleware/index.js");

router.use(cekLogin);
router.get("/cek-konfirmasi", cekKonfirmasi);
router.post("/terima-konfirmasi/:id", terimaKonfirmasi);
router.post("/tolak-konfirmasi/:id", tolakKonfirmasi);

module.exports = router;
