const { contacts: services } = require("../../../services");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await services.getById(contactId);

    if (!contact) {
      return res.status(404).json({
        status: "success",
        code: 404,
        message: `Contact with ID = "${contactId}" not found`,
      });
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getById;
