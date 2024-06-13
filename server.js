const port = process.env.PORT || 5000;
const dbConnection = require("./config/db");
const socketIo = require("socket.io");
const socketHandler = require("./helper/socketHelper");
const color = require("colors");
const app = require("./app");
require("dotenv").config();

//db connect here
dbConnection(process.env.DB_URL);
const server = app.listen(port, "192.168.10.16", () => {
  console.log(color.yellow("Application running on port", port));
});

//socket listen here
const io = socketIo(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

socketHandler(io);
global.io = io;
