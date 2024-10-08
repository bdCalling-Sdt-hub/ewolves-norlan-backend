const { Schema, model } = require("mongoose");

const eventModel = new Schema({
  name: {
    type: String,
    require: true,
  },
  colors: [String],
  image: {
    type: String,
    require: true,
  },
});
const Event = model("event", eventModel);
module.exports = Event;
