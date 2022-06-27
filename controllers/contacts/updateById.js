const contacts = require("../../models/contacts");
const createError = require("../../helpers/createError");
const { updateSchema } = require("../../schemas/contacts");

const updateById = async (req, res) => {
  const { error } = updateSchema.validate(req.body);
  if (error) {
    throw createError(400, "missing fields");
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateById;
