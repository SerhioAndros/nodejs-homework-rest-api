const jwt = require("jsonwebtoken");
const { users: services } = require("../../../services");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await services.getOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "User or password invalid",
      });
    }

    const isPasswordCorrect = user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "User or password invalid",
      });
    }

    const payload = {
      id: user._id,
    };

    const { SECRET_KEY } = process.env;

    const token = jwt.sign(payload, SECRET_KEY);

    await services.update(user._id, { token });

    res.json({
      status: "success",
      code: 200,
      data: {
        token,
      },
    });
  } catch (error) {
    next(err);
  }
};

module.exports = login;
