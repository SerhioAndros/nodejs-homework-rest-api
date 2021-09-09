const express = require("express");

const { auth: ctrl } = require("../controllers");

const { validation, authenticate } = require("../middlewares");
const { userJoiSchema } = require("../../model/schema");

const router = express.Router();

router.post("/signup", validation(userJoiSchema), ctrl.signup);

router.post("/login", ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.current);

router.get("/verify/:verificationToken", ctrl.updateVerification);

router.post("/verify", ctrl.resendVerification);

router.patch("/", authenticate, ctrl.updateSubscription);

module.exports = router;
