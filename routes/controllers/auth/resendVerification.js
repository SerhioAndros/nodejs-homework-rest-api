const mailSender = require("../../../utils");
const { users: services } = require("../../../services");

const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Missing required field email",
      });
    }

    const user = await services.getOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }

    if (user.verify) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Verification has already been passed",
      });
    }

    const { URL } = process.env;
    const mail = {
      to: email,
      subject: "Email verification",
      html: `<a href="${URL}/verify/${user.verifyToken}" trget="_blank">Confirm your email</a>`,
    };
    await mailSender(mail);

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Verification email sent",
    });
  } catch (err) {
    next(error);
  }
};

module.exports = resendVerification;
