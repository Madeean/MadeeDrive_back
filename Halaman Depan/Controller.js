const Db = require("../Database/Database");
const config = require("../config");
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
};
