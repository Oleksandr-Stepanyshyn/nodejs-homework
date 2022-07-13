const { User } = require("../../models/user");
const { createError } = require("../../helpers");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  // console.log("verificationToken", verificationToken);
  const user = await User.findOne({ verificationToken });
  // console.log("user", user);
  if (!user) {
    throw createError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.json({ message: "Verification successful" });
};

module.exports = verifyEmail;
