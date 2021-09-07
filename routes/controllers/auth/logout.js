const { users: services } = require("../../../services");

const logout = async (req, res, next) => {
  try {
    const { _id: id } = req.user;
    await services.update(id, { token: null });

    res.json({
      status: "success",
      code: 200,
      message: "Successful logout",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = logout;
