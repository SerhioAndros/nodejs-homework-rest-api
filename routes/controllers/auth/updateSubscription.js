const { users: services } = require("../../../services");

const updateSubscription = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).find((item) => item === "subscription")) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Missing field 'subscription'",
      });
    }

    const userId = req.user._id;

    const { subscription } = req.body;

    if (
      subscription !== "starter" &&
      subscription !== "pro" &&
      subscription !== "business"
    ) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Field 'subscription' is not correct",
      });
    }

    const updateUserBody = {
      subscription,
    };

    const updatedUser = await services.updateUserData(userId, updateUserBody);

    if (!updatedUser) {
      return res.status(404).json({
        status: "success",
        code: 404,
        message: `Contact with ID = "${userId}" not found`,
      });
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result: updatedUser,
      },
    });
  } catch (err) {
    next(error);
  }
};

module.exports = updateSubscription;
