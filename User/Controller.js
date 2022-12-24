const Db = require("../Database/Database");
const config = require("../config");
module.exports = {
  cekKonfirmasi: async (req, res) => {
    if (req.user.admin == 0) {
      return res.json(
        {
          message: "Anda tidak memiliki akses",
        },
        403
      );
    } else {
      try {
        let data = await Db("user").where("konfirmasi", 0).where("admin", 0);
        if (data.length > 0) {
          return res.json(
            {
              data: data,
            },
            200
          );
        } else {
          return res.json(
            {
              message: "Tidak ada user yang belum dikonfirmasi",
            },
            200
          );
        }
      } catch (err) {
        console.log(err);
        return res.json(
          {
            message: "Internal Server Error",
          },
          500
        );
      }
    }
  },
  terimaKonfirmasi: async (req, res) => {
    if (req.user.admin == 0) {
      return res.json(
        {
          message: "Anda tidak memiliki akses",
        },
        403
      );
    } else {
      try {
        let id = req.params.id;
        let data = await Db("user").where("id", id).update({
          konfirmasi: 1,
        });
        if (data > 0) {
          return res.json(
            {
              message: "Konfirmasi berhasil",
            },
            200
          );
        } else {
          return res.json(
            {
              message: "Konfirmasi gagal",
            },
            400
          );
        }
      } catch (err) {
        console.log(err);
        return res.json(
          {
            message: "Internal Server Error",
          },
          500
        );
      }
    }
  },
  tolakKonfirmasi: async (req, res) => {
    if (req.user.admin == 0) {
      return res.json(
        {
          message: "Anda tidak memiliki akses",
        },
        403
      );
    } else {
      try {
        let id = req.params.id;
        let data = await Db("user").where("id", id).update({
          konfirmasi: 0,
        });
        if (data > 0) {
          return res.json(
            {
              message: "Konfirmasi berhasil",
            },
            200
          );
        } else {
          return res.json(
            {
              message: "Konfirmasi gagal",
            },
            400
          );
        }
      } catch (err) {
        console.log(err);
        return res.json(
          {
            message: "Internal Server Error",
          },
          500
        );
      }
    }
  },
};
