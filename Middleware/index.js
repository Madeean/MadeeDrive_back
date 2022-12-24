const config = require("../config");
const jwt = require("jsonwebtoken");
const Db = require("../Database/Database");
module.exports = {
  cekLogin: async (req, res, next) => {
    try {
      let token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;
      // res.json({ data: token });
      if (!token) {
        return res.json({ data: "token tidak ada login dahulu" });
      }
      let decode = jwt.verify(token, config.jwtkey);
      let user = await Db("user").where({ id: decode.id }).first();
      if (!user) {
        return res.json({ data: "pakai akun yang sudah login" });
      }
      let user_with_token = await Db("user").where("id", user.id).first();
      if (user_with_token.token != token) {
        return res.json({ data: "token tidak valid" });
      }
      req.user = user;
      next();
    } catch (e) {
      console.log(e);
      return res.json({ data: "kesalahan pada server" });
    }
  },
};
