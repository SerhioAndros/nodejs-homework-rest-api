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

const updateUserSubscription = async (id, data) => {
  try {
    console.log("ID", id);
    console.log("DATA", data);
    await User.findByIdAndUpdate(id, data);
    return User.findById(id, "_id email subscription");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getOne,
  getById,
  add,
  update,
  updateUserSubscription,
};
