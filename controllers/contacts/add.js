const contacts = require("../../models/contacts");
const createError = require("../../helpers/createError");
const { addSchema } = require("../../schemas/contacts");

const add = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw createError(400, "missing required field");
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

module.exports = add;
