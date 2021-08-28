const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const validateContacts = (req, res, next) => {
  const { error } = contactsSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }

  next();
};

module.exports = validateContacts;
