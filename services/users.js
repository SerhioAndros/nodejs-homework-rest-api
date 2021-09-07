const { User } = require("../model");

const getOne = (filter) => {
  return User.findOne(filter);
};

const getById = (id) => {
  return User.findById(id);
};

const add = ({ password, ...rest }) => {
  const newUser = new User(rest);
  newUser.setPassword(password);
  newUser.save();
  const { email, subscription } = newUser;
  return { email, subscription };
};

const update = (id, data) => {
  return User.findByIdAndUpdate(id, data);
};

module.exports = {
  getOne,
  getById,
  add,
  update,
};
