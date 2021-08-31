const { getContactById } = require("../../../model");

const getById = async (req, res) => {
  try {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);

    res.json({
      status: "success",
      code: 200,
      data: {
        result: contact,
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

module.exports = getById;
