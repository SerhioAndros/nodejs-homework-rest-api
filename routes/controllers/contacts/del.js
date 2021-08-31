const { removeContact } = require("../../../model");

const del = async (req, res) => {
  try {
    const { contactId } = req.params;

    const deletedContact = await removeContact(contactId);

    res.json({
      status: "success",
      code: 200,
      data: {
        result: deletedContact,
      },
    });
  } catch (err) {
    return res.status(404).json({
      statys: "error",
      code: 404,
      message: "Contact not found",
    });
  }
};

module.exports = del;
