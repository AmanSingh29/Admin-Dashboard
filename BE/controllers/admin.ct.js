const { default: mongoose } = require("mongoose");
const AppError = require("../utils/appError.ut");
const { logActivity } = require("../services/log.sv");
const { LOG_ACTIONS } = require("../constants/enums");
const User = mongoose.model("users");
const Log = mongoose.model("logs");

async function getAllUsers(req, res, next) {
  const users = await User.find().select("-password");
  res.data = {
    statusCode: 200,
    users,
  };
  next();
}

async function updateUserRole(req, res, next) {
  const { role, user_id } = req.body;

  const user = await User.findByIdAndUpdate(
    user_id,
    { $set: { role } },
    { new: true }
  ).select("-password");

  if (!user) throw new AppError("User not found", 404);
  logActivity({
    user_id: req.user?._id,
    action: LOG_ACTIONS.USER_ROLE_UPDATED,
    details: user,
    description: `Role has been changed to ${role} of ${user.name} by ${req.user.name}`,
  });
  res.data = {
    user,
    message: "Role Updated Successfully!",
    statusCode: 200,
  };
  next();
}

async function deleteUser(req, res, next) {
  const user = await User.findByIdAndDelete(req.params.user_id);
  if (!user) throw new AppError("User not found", 404);
  logActivity({
    user_id: req.user?._id,
    action: LOG_ACTIONS.USER_DELETED,
    details: user,
    description: `An User (${user.name}) has been deleted by ${req.user.name}`,
  });
  res.data = {
    message: "User Deleted Successfully!",
    statusCode: 200,
  };
  next();
}

async function getLogs(req, res, next) {
  const logs = await Log.find()
    .sort({ created_at: -1 })
    .select("action description created_at");
  res.data = {
    statusCode: 200,
    logs,
  };
  next();
}

module.exports = {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getLogs,
};
