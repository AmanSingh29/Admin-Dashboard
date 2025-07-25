const express = require("express");
const { asyncHandler } = require("../middlewares/asyncHandler.mw");
const { registerSchema, loginSchema } = require("../validators/auth.vld");
const { handleSignup, handleLogin } = require("../controllers/auth.ct");
const sendResponseMw = require("../middlewares/sendResponse.mw.js");
const router = express.Router();

router
  .route("/signup")
  .post(
    registerSchema,
    asyncHandler(handleSignup),
    sendResponseMw
  );
router
  .route("/login")
  .post(
    loginSchema,
    asyncHandler(handleLogin),
    sendResponseMw
  );

module.exports = router;
