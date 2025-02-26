const { User } = require("../../models/user");
const { createError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "Email or password is wrong or not verify");
  }
  if (!user.verify) {
    throw createError(401, "User not verification");
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw createError(401, "Email or password is wrong");
  }

  const payload = { _id: user._id, subscription: user.subscription };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate(user._id, { token });
  // or
  // user.token = token;
  // await user.save()

  res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
