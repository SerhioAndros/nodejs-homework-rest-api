const { users: services } = require("../../../services");

const current = async (req, res, next) => {
  try {
    const { _id: id } = req.user;
    const userInfo = await services.getById(id);
    const { email, subscription } = userInfo;
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
