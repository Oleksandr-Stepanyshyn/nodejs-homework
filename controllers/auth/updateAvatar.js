const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { createError } = require("../../helpers");
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempDir, originalname } = req.file;
  const { _id } = req.user;
  const [extension] = originalname.split(".").reverse();
  const newName = `${_id}.${extension}`;

  const file = await Jimp.read(tempDir);
  const fileResize = file.resize(250, 250);
  fileResize.write(tempDir);

  const resultDir = path.join(avatarsDir, newName);

  await fs.rename(tempDir, resultDir);

  const avatarURL = path.join("avatars", newName);
  const user = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
  if (!user.avatarURL) {
    throw createError(401);
  }

  res.json({ avatarURL: user.avatarURL });
};

module.exports = updateAvatar;
