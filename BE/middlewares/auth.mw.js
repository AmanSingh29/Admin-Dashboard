const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError.ut");
const { default: mongoose } = require("mongoose");
const User = mongoose.model("users");

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new AppError("Unauthorized Access!", 401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id).select("-password");
    if (!user) throw new AppError("User not found", 401);
    req.user = user;
  } catch (error) {
    throw new AppError(error.message, 401);
  }
  next();
};

module.exports = {
  authenticateUser,
};
