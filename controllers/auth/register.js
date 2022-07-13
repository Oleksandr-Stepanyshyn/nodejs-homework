const { User } = require("../../models/user");
const { createError, sendEmail } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const ObjectID = require("bson-objectid");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = ObjectID();
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "to admit email",
    html: `<h2>Confirm registration on the site <a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}" >Phonebook</a></h2>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    user: {
      name: result.name,
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = register;
