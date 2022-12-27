const Db = require("../Database/Database");
const config = require("../config");
const shortid = require("shortid");
module.exports = {
  pageDepan: async (req, res) => {
    try {
      let buku = await Db("buku").where("public", 0);
      return res.json({ data: buku }, 200);
    } catch (e) {
      console.log(e);
      return res.json({ data: "buku tidak ada" }, 400);
    }
  },
  shortlink: async (req, res) => {
    try {
      let susun = "http://localhost:3000/" + req.params.shorturl;
      let buku = await Db("buku").where("shorturl", susun);
      const shorturl = buku[0].foto_buku;
      return res.json({ data: shorturl }, 200);
    } catch (e) {
      console.log(e);
      return res.json({ data: "buku tidak ada" }, 400);
    }
  },
};
