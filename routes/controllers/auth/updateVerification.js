const { users: services } = require("../../../services");

const updateVerification = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await services.getOne({ verifyToken: verificationToken });
    if (!user) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }
    await services.updateUserData(user._id, {
      verify: true,
      verifyToken: null,
    });
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Verification successful",
    });
  } catch (err) {
    next(error);
  }
};

module.exports = updateVerification;
