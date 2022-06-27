const { createError } = require("../helpers");

const hasBody = (req, res, next) => {
  const isBody = req.body.hasOwnProperty("favorite");
  if (!isBody) {
    const error = createError(400, "missing field favorite");
    return next(error);
  }
  next();
};

module.exports = hasBody;
