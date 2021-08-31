const { addContact } = require("../../../model");

const add = async (req, res) => {
  try {
    if (!Object.keys(req.body).includes("name")) {
      return res.status(404).json({
        status: "error",
        code: 400,
        message: "Missing required field 'name'",
      });
    }

    if (!Object.keys(req.body).includes("email")) {
      return res.status(404).json({
        status: "error",
        code: 400,
        message: "Missing required field 'email'",
      });
    }

    if (!Object.keys(req.body).includes("phone")) {
      return res.status(404).json({
        status: "error",
        code: 400,
        message: "Missing required field 'phone'",
      });
    }

    const newProduct = { ...req.body };

    const addedContact = await addContact(newProduct);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: addedContact,
      },
    });
  } catch (err) {
    throw err;
  }
};

module.exports = add;
