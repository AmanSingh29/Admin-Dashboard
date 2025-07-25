const mongoose = require("mongoose");
const AppError = require("../utils/appError.ut");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("----------Database connected----------");
  } catch (error) {
    throw new AppError(`Err in connecting DB: ${error.message}`, 500);
  }
};

module.exports = { connectDB };
