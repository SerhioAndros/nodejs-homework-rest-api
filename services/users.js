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
  const { email, subscription, avatarURL } = newUser;
  return { email, subscription, avatarURL };
};

const update = (id, data) => {
  return User.findByIdAndUpdate(id, data);
};

const updateUserData = async (id, data) => {
  try {
    await User.findByIdAndUpdate(id, data);
    return User.findById(id, "_id email subscription avatarURL");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getOne,
  getById,
  add,
  update,
  // updateUserSubscription,
  updateUserData,
};
