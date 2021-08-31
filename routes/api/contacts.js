const express = require("express");
const { contacts: ctrl } = require("../controllers");
const { validateContacts } = require("../middlewares");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateContacts, ctrl.add);

router.delete("/:contactId", ctrl.del);

router.put("/:contactId", validateContacts, ctrl.update);

module.exports = router;
