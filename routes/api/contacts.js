const express = require("express");
const { contacts: ctrl } = require("../controllers");
const { validation, authenticate } = require("../middlewares");
const { joiContactSchema } = require("../../model/schema");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, ctrl.getById);

router.post("/", authenticate, validation(joiContactSchema), ctrl.add);

router.delete("/:contactId", authenticate, ctrl.del);

router.put(
  "/:contactId",
  authenticate,
  // validation(joiContactSchema),
  ctrl.update
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  //   validation(joiContactSchema),
  ctrl.updateStatus
);

module.exports = router;
