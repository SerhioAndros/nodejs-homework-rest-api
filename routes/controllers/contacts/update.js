const { updateContact } = require("../../../model");

const update = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(404).json({
        status: "error",
        code: 400,
        message: "Missing fields",
      });
    }

    const { contactId } = req.params;
    const updateContactBody = { ...req.body };
    const updatedContact = await updateContact(contactId, updateContactBody);

    res.json({
      status: "success",
      code: 200,
      data: {
        result: updatedContact,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Contact not found",
    });
  }
};

module.exports = update;
