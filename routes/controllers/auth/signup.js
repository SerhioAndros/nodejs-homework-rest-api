const { users: services } = require("../../../services");

const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await services.getOne({ email });
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email in use",
      });
    }

    const createdUser = await services.add(req.body);
    console.log(createdUser);

    res.status(201).json({
      status: "success",
      code: 201,
      data: { user: createdUser },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = signup;
