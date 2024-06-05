const mongoose = require("mongoose");
const color = require("colors");

const dbConnection = async (DB_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "norlan",
    };
    await mongoose.connect(DB_URL, DB_OPTIONS);
    console.log(color.bgGreen("🚀 Database connected successfully"));
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
