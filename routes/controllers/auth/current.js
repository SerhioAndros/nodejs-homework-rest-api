const { users: services } = require("../../../services");

const current = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({
      status: "success",
      code: 200,
      data: { email, subscription },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = current;
