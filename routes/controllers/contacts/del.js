const { contacts: services } = require("../../../services");

const del = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const deletedContact = await services.deleteById(contactId);
    if (!deletedContact) {
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
        result: deletedContact,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = del;
