const mongoose = require("mongoose");
const { logActivity } = require("../services/log.sv");
const { LOG_ACTIONS } = require("../constants/enums");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

postSchema.post("save", function (data) {
  const { user_id } = data || {};
  logActivity({
    user_id,
    details: data,
    action: LOG_ACTIONS.POST_CREATED,
    description: `A new Post has been created: ${data.title}`,
  });
});

module.exports = mongoose.model("posts", postSchema);
