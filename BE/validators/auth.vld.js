const { celebrate, Joi, Segments } = require("celebrate");
const { USER_ROLES } = require("../constants/enums");

const registerSchema = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string()
      .valid(...Object.values(USER_ROLES))
      .optional(),
  }).required(),
});

const loginSchema = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
