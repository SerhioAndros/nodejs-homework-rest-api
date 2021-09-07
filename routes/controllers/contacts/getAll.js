const { contacts: services } = require("../../../services");

const getAll = async (req, res, next) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const filter = { owner: req.user._id };
    const contacts = await services.getAll({ page, limit }, filter);
    res.json({
      status: "success",
      code: 200,
      data: {
        result: { contacts },
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAll;
