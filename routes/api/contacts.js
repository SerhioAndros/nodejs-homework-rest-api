const express = require("express");
const { contacts: ctrl } = require("../controllers");
const { validation } = require("../middlewares");
const { joiContactSchema } = require("../../model/schema");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validation(joiContactSchema), ctrl.add);

router.delete("/:contactId", ctrl.del);

router.put("/:contactId", validation(joiContactSchema), ctrl.update);

router.patch(
  "/:contactId/favorite",
  //   validation(joiContactSchema),
  ctrl.updateStatus
);

module.exports = router;
