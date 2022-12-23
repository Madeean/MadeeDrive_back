const Db = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "madeedrive",
  },
});

module.exports = Db;
