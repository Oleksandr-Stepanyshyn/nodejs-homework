const contacts = require("../../models/contacts");
const createError = require("../../helpers/createError");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = getById;
