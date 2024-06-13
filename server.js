const port = process.env.PORT || 5000;
const socketIo = require("socket.io");
const socketHandler = require("./helper/socketHelper");
const color = require("colors");
const app = require("./app");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

//db connect here
async function main() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(color.green("♻️  Database connected successfully"));

    const server = app.listen(port, "104.248.15.129", () => {
      console.log(color.yellow("🚀 Application running on port", port));
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
  } catch (error) {
    console.log("🤢 Failed to connect database", error);
  }
}

main();
