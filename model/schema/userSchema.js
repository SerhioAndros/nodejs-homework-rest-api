const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const userSchema = Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 5,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: emailRegExp,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(5));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const userJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(5).required(),
  subscription: Joi.string().default("starter"),
  token: Joi.string(),
});

module.exports = {
  userSchema,
  userJoiSchema,
};
