const { Contact } = require("../model");

const getAll = (pagination, filter) => {
  const { page, limit } = pagination;
  const skip = page * limit - limit;

  return Contact.find(filter, "_id name email phone favorite", {
    skip,
    limit: +limit,
  });
};

const getById = (id, filter) => {
  return Contact.find({ _id: id, owner: filter });
};

const add = (newContact) => {
  return Contact.create(newContact);
};

const updateById = (id, data) => {
  return Contact.findByIdAndUpdate(id, data, { new: true });
};

const updateStatusContact = (id, data) => {
  return Contact.findByIdAndUpdate(id, data, { new: true });
};

const deleteById = (id) => {
  return Contact.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
  updateStatusContact,
};
