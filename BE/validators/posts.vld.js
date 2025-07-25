const { celebrate, Joi, Segments } = require("celebrate");

const createPostValidator = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }).required(),
});

const updateDeletePostVaidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    post_id: Joi.string().required(),
  }).required(),
});

module.exports = {
  updateDeletePostVaidator,
  createPostValidator,
};
