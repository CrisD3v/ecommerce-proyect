const server = require("./src/App/App");

const { conn } = require("./src/App/Db");

// Error handler middleware
server.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

server.listen(server.get("port"), () => {
  console.log("server is running on port " + server.get("port"));
});
conn.sync({ force: false }).then(() => {
  console.log("db is conect");
});
