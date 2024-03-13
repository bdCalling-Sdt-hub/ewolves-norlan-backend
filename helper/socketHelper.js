const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`Socket connected with ${socket.id}`);

    socket.on("chat", (payload) => {
      console.log(payload);
      socket.emit("chat", payload);
    });
  });
};

module.exports = socketHandler;
