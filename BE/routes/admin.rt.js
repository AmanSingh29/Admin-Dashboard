const express = require("express");
const { authenticateUser } = require("../middlewares/auth.mw");
const { authorizeRoles } = require("../middlewares/authorizeRoles.mw");
const {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getLogs,
} = require("../controllers/admin.ct");
const { USER_ROLES } = require("../constants/enums");
const sendResponseMw = require("../middlewares/sendResponse.mw");
const {
  updateUserRoleVaidator,
  deleteUserVaidator,
} = require("../validators/admin.vld");
const { asyncHandler } = require("../middlewares/asyncHandler.mw");

const router = express.Router();

router.use(authenticateUser, authorizeRoles(USER_ROLES.ADMIN));

router
  .route("/users")
  .get(asyncHandler(getAllUsers), sendResponseMw)
  .patch(updateUserRoleVaidator, asyncHandler(updateUserRole), sendResponseMw);

router
  .route("/users/:user_id")
  .delete(deleteUserVaidator, asyncHandler(deleteUser), sendResponseMw);

router.route("/logs").get(asyncHandler(getLogs), sendResponseMw);

module.exports = router;
