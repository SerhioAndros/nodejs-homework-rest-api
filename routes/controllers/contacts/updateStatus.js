const { contacts: services } = require("../../../services");

const updateStatus = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).find((item) => item === "favorite")) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Missing field 'favorite'",
      });
    }

    const { contactId } = req.params;

    if (contactId.length !== 24) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "ID format is not correct",
      });
    }

    const { favorite } = req.body;

    if (typeof favorite !== "boolean") {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Field 'favorite' is not correct",
      });
    }

    const updateContactBody = {
      favorite,
    };

    const filter = req.user._id;

    const contact = await services.getById(contactId, filter);
    if (contact.length !== 1) {
      return res.status(404).json({
        status: "success",
        code: 404,
        message: `Contact with ID = "${contactId}" not found`,
      });
    }

    const updatedContact = await services.updateStatusContact(
      contactId,
      updateContactBody
    );

    if (!updatedContact) {
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
        result: updatedContact,
      },
    });
  } catch (err) {
    next(error);
  }
};

module.exports = updateStatus;
