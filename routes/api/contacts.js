const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validation, isValidId, hasBody } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));
router.post("/", validation(schemas.add), ctrlWrapper(ctrl.add));
router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.remove));
router.put(
  "/:contactId",
  isValidId,
  validation(schemas.update),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  hasBody,
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
