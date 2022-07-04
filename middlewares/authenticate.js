const jwt = require("jsonwebtoken");
const { createError } = require("../helpers");
const { User } = require("../models/user");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw createError(401, "Not authorized");
    }
    try {
      const { _id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(_id);
      if (!user || !user.token) {
        throw createError(401, "Not authorized");
      }
      req.user = user;
      next();
    } catch (error) {
      throw createError(401, "Not authorized");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
