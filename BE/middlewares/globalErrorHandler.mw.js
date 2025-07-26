const { isCelebrateError } = require("celebrate");

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    let message = "Validation failed!";
    let errors = [];

    for (const [_, joiError] of err.details.entries()) {
      errors = joiError.details.map((detail) => {
        return `${detail.message.replace(/["]/g, "")}`;
      });
      message = errors.join(", ");
    }
    err.statusCode = 400;
    err.status = "fail";
    err.message = message;
  }
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "Something went wrong!";
  console.error(`[${err.statusCode}] ${err.message}`);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    statusCode: err.statusCode,
  });
};
