const USER_ROLES = {
  ADMIN: "admin",
  EDITOR: "editor",
  VIEWER: "viewer",
};

const LOG_ACTIONS = {
  LOGIN: "login",
  SIGNUP: "signup",
  USER_ROLE_UPDATED: "user_role_updated",
  USER_DELETED: "user_deleted",
  POST_CREATED: "post_created",
  POST_UPDATED: "post_updated",
  POST_DELETED: "post_deleted",
};

module.exports = {
  USER_ROLES,
  LOG_ACTIONS,
};
