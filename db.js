const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MongoURI, { useNewUrlParser: true });
    console.log("DB Connected");
  } catch (error) {
    console.log("Database connection error:", error);
  }
};

module.exports = mongoDB;
