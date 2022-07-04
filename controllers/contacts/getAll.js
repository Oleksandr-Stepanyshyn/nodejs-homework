const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  if (req.query.favorite) {
    const result = await Contact.find(
      {
        favorite: req.query.favorite,
        owner,
      },
      "",
      {
        skip,
        limit: Number(limit),
      }
    ).populate("owner", "name email");

    res.json(result);
    return;
  }

  const result = await Contact.find({ owner }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "name email");

  res.json(result);
};

module.exports = getAll;
