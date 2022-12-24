const express = require("express");
var path = require("path");
var cors = require("cors");
const multer = require("multer");
const os = require("os");
const fs = require("fs");
var cookieParser = require("cookie-parser");
const Db = require("./Database/Database");

var BukuRoutes = require("./Buku/Routes");
var AuthRoutes = require("./Auth/Routes");
var HalamanDepan = require("./Halaman Depan/Routes");
var UserRoutes = require("./User/Routes");

const app = express();
app.use(cors());

const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  bodyParser.json({
    limit: "100mb",
  })
);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use("/", HalamanDepan);
app.use("/buku", BukuRoutes);
app.use("/", AuthRoutes);
app.use("/user", UserRoutes);

module.exports = app;
