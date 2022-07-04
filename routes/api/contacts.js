const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const {
  validation,
  isValidId,
  hasBody,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));
router.get("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.getById));
router.post("/", authenticate, validation(schemas.add), ctrlWrapper(ctrl.add));
router.delete("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.remove));
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validation(schemas.update),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  hasBody,
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
