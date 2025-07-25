const { celebrate, Joi, Segments } = require("celebrate");
const { USER_ROLES } = require("../constants/enums");

const updateUserRoleVaidator = celebrate({
  [Segments.BODY]: Joi.object({
    user_id: Joi.string().required(),
    role: Joi.string()
      .valid(...Object.values(USER_ROLES))
      .required(),
  }).required(),
});

const deleteUserVaidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    user_id: Joi.string().required(),
  }).required(),
});

module.exports = {
  updateUserRoleVaidator,
  deleteUserVaidator,
};
