const {listContacts} = require("../../../model");

const getAll = async (req, res) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (err) {
    throw err;
  }
};

module.exports = getAll;
