const express = require("express");

const { auth: ctrl } = require("../controllers");

const { validation, authenticate, imgUpload } = require("../middlewares");
const { userJoiSchema } = require("../../model/schema");

//
// const tmpDir = require("../middlewares/tmpImgSave");
// console.log(tmpDir);
//

const router = express.Router();

router.post("/signup", validation(userJoiSchema), ctrl.signup);

router.post("/login", ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.current);

router.get("/verify/:verificationToken", ctrl.updateVerification);

router.post("/verify", ctrl.resendVerification);

router.patch("/", authenticate, ctrl.updateSubscription);

router.patch(
  "/avatars",
  authenticate,
  imgUpload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
