const { default: mongoose } = require("mongoose");
const Log = mongoose.model("logs");

async function logActivity({ user_id, action, details, description }) {
  try {
    await Log.create({
      user_id,
      action,
      details,
      description
    });
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
}

module.exports = {
  logActivity,
};
