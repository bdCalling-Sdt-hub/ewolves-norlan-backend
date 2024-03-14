const Chat = require("../models/chat.model");
const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`Socket connected with ${socket.id}`);
    socket.on('sendMessage',  async ({ senderId, receiverId, receiver , message, sender }) => {
      if (receiverId) {
        socket.to(receiverId).emit("receive-message", {
          sender: sender,
          receiver: receiver,
          message : message,
          senderId: senderId
        });
      }
      await Chat.create({
        sender: sender,
        receiver: receiver,
        message : message,
      });

    });
  });
};

module.exports = socketHandler;
