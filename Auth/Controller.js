const config = require("../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Db = require("../Database/Database");
module.exports = {
  register: async (req, res) => {
    try {
      let name = req.body.name;
      let email = req.body.email;
      let password = req.body.password;

      let checkEmail = await Db("user").where({ email: email }).first();
      if (checkEmail) {
        return res.json({ data: "email sudah digunakan" });
      }

      // res.json({ data: name, email, password });
      // console.log(name, password, email);
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, salt);
      let id = await Db("user").insert({
        name: name,
        password: hash,
        email: email,
      });
      return res.json({
        id: id[0],
        name: name,
        email: email,
      });
    } catch (e) {
      console.log(e);
      return res.json({ data: "gagal register" });
    }
  },
  login: async (req, res) => {
    try {
      let email = req.body.email;
      let password = req.body.password;
      // res.json({ data: email, password });
      let user = await Db("user").where({ email: email }).first();
      if (!user) {
        return res.json({ data: "email tidak ditemukan" });
      }
      let checkPassword = bcrypt.compareSync(password, user.password);
      if (!checkPassword) {
        return res.json({ data: "password salah" });
      }
      let token = jwt.sign({ id: user.id }, config.jwtkey);
      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: token,
      });
    } catch (e) {
      console.log(e);
      res.json({ data: "gagal login" });
    }
  },
};
