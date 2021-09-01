const { contacts: services } = require("../../../services");

const update = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Missing fields",
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

    const updateContactBody = { ...req.body };
    const updatedContact = await services.updateById(
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

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: updatedContact,
      },
    });
  } catch (err) {
    return next(error);
  }
};

module.exports = update;
