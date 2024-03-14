const Chat = require("../models/chat.model");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`Socket connected with ${socket.id}`);
    socket.on('sendMessage',  async ({ receiverId, receiverSocket , message, senderId }) => {
      if (receiverSocket) {
        socket.to(receiverSocket).emit("receive-message", {
          message,
          senderId: senderId
        });
      }
    });
  });
};

module.exports = socketHandler;
