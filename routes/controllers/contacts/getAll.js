const { contacts: services } = require("../../../services");

const getAll = async (_, res, next) => {
  try {
    const contacts = await services.getAll();
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
