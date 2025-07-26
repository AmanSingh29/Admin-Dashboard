const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} = require("../controllers/posts.ct");
const { authenticateUser } = require("../middlewares/auth.mw");
const { authorizeRoles } = require("../middlewares/authorizeRoles.mw");
const { USER_ROLES } = require("../constants/enums");
const { asyncHandler } = require("../middlewares/asyncHandler.mw");
const sendResponseMw = require("../middlewares/sendResponse.mw");
const {
  createPostValidator,
  updateDeletePostVaidator,
} = require("../validators/posts.vld");

router.use(authenticateUser);

router
  .route("/")
  .post(
    authorizeRoles(USER_ROLES.EDITOR),
    createPostValidator,
    asyncHandler(createPost),
    sendResponseMw
  )
  .get(
    authorizeRoles(USER_ROLES.EDITOR, USER_ROLES.VIEWER),
    asyncHandler(getAllPosts),
    sendResponseMw
  );

router
  .route("/:post_id")
  .patch(
    authorizeRoles(USER_ROLES.EDITOR),
    updateDeletePostVaidator,
    asyncHandler(updatePost),
    sendResponseMw
  )
  .delete(
    authorizeRoles(USER_ROLES.EDITOR),
    updateDeletePostVaidator,
    asyncHandler(deletePost),
    sendResponseMw
  );

module.exports = router;
