const server = require("./src/App/App");

const { conn } = require("./src/App/Db");

server.listen(server.get("port"), () => {
  console.log("server is running on port " + server.get("port"));
});
conn.sync({ force: false }).then(() => {
  console.log("db is conect");
});
