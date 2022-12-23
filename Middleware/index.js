const config = require("../config");
const jwt = require("jsonwebtoken");
const Db = require("../Database/Database");
module.exports = {
  cekLogin: async (req, res, next) => {
    try {
      let token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;
      if (!token) {
        return res.json({ data: "token tidak ada login dahulu" });
      }
      let decode = jwt.verify(token, config.jwtkey);
      let user = await Db("user").where({ id: decode.id }).first();
      if (!user) {
        return res.json({ data: "pakai akun yang sudah login" });
      }
      req.user = user;
      next();
    } catch (e) {
      console.log(e);
      return res.json({ data: "kesalahan pada server" });
    }
  },
};
