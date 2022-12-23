const Db = require("../Database/Database");
const fs = require("fs");
var path = require("path");
const config = require("../config");
module.exports = {
  getAllBuku: async (req, res) => {
    try {
      let buku = await Db("buku");
      const url = req.protocol + "://" + req.get("host");
      res.json({ data: buku, status: url }, 200);
      // res.json(buku);
    } catch (e) {
      console.log(e);
      res.json({ data: "buku tidak ada" }, 400);
    }
  },

  tambahBuku: async (req, res) => {
    try {
      let judul = req.body.judul;
      let sinopsis = req.body.sinopsis;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        const url =
          req.protocol + "://" + req.get("host") + "/uploads/" + filename;
        src.on("end", async () => {
          let id = await Db("buku").insert({
            judul: judul,
            sinopsis: sinopsis,
            foto_buku: url,
          });
          res.json({
            id: id[0],
            judul,
            sinopsis,
            foto_buku: url,
          });
        });
        src.on("error", async () => {
          res.json({ data: "gagal upload foto" }, 400);
        });
      } else {
        res.json({ data: "foto tidak ada" }, 400);
      }
    } catch (e) {
      console.log(e);
      res.json(e, 400);
    }
  },
  getBukuById: async (req, res) => {
    try {
      let id = req.params.id;
      let buku = await Db("buku").where("id", id);
      return res.status(200).json({ data: buku });
    } catch (e) {
      console.log(e);
      res.json(e, 400);
    }
  },
  editBuku: async (req, res) => {
    try {
      let id = req.params.id;
      let judul = req.body.judul;
      let sinopsis = req.body.sinopsis;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.join(__dirname, "public/uploads/" + filename);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        const url =
          req.protocol + "://" + req.get("host") + "/uploads/" + filename;
        src.on("end", async () => {
          await Db("buku").where("id", id).update({
            judul: judul,
            sinopsis: sinopsis,
            foto_buku: url,
          });
          return res.json({
            judul,
            sinopsis,
            foto_buku: url,
          });
        });
        src.on("error", async () => {
          return res.json({ data: "gagal upload foto" }, 400);
        });
      } else {
        await Db("buku").where("id", id).update({
          judul: judul,
          sinopsis: sinopsis,
        });
        return res.json({
          id,
          judul,
          sinopsis,
        });
      }
    } catch (e) {
      console.log(e);
      res.json(e, 400);
    }
  },
  deleteBuku: async (req, res) => {
    try {
      let id = req.params.id;
      await Db("buku").where("id", id).del();
      return res.json({ data: "berhasil delete" }, 200);
    } catch (e) {
      console.log(e);
      res.json(e, 400);
    }
  },
};