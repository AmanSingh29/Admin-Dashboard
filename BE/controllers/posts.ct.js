const { default: mongoose } = require("mongoose");
const AppError = require("../utils/appError.ut");
const { logActivity } = require("../services/log.sv");
const { LOG_ACTIONS } = require("../constants/enums");
const Post = mongoose.model("posts");

async function createPost(req, res, next) {
  const { title, content } = req.body;
  const post = await new Post({
    title,
    content,
    user_id: req.user._id,
  }).save();
  res.data = {
    statusCode: 201,
    data: post,
  };
  next();
}

async function getAllPosts(req, res, next) {
  const posts = await Post.find().populate("user_id", "name email");
  res.data = {
    statusCode: 200,
    data: posts,
  };
  next();
}

async function updatePost(req, res, next) {
  const { post_id } = req.params;
  const post = await Post.findByIdAndUpdate(post_id, req.body, { new: true });
  if (!post) throw new AppError("Post not Found!", 404);
  logActivity({
    user_id: req.user?._id,
    action: LOG_ACTIONS.POST_UPDATED,
    details: post,
    description: `${req.user.name} updated a post: ${post.title}`,
  });
  res.data = {
    statusCode: 200,
    data: post,
  };
  next();
}

async function deletePost(req, res, next) {
  const { post_id } = req.params;
  const post = await Post.findByIdAndDelete(post_id);
  if (!post) throw new AppError("Post not Found!", 404);
  logActivity({
    user_id: req.user?._id,
    action: LOG_ACTIONS.POST_DELETED,
    details: post,
    description: `${req.user.name} deleted a post: ${post.title}`,
  });
  res.data = {
    statusCode: 200,
    message: "Post Deleted Successfully!",
  };
  next();
}

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
};
