const mongoose = require("mongoose");
const { LOG_ACTIONS } = require("../constants/enums");

const logSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
    action: {
      type: String,
      required: true,
      enum: Object.values(LOG_ACTIONS),
    },
    description: {
      type: String,
      required: true,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("logs", logSchema);
