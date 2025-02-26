const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  console.log(contactId);
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateFavorite;
