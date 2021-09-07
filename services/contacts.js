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
  // return Contact.findById(id, "_id name email phone owner favorite");

  // try {
  //   const userContacts = await Contact.find(
  //     filter,
  //     "_id name email phone favorite"
  //   );
  //   const result = userContacts.find((contact) => {
  //     console.log("contact ID", typeof toSting(contact._id));
  //     console.log("query ID", typeof id);
  //     if (contact._id === id) {
  //       return contact;
  //     }
  //     return;
  //   });
  //   return result;
  // } catch (error) {
  //   throw error;
  // }

  // const userContacts = Contact.find(filter, "_id name email phone favorite");
  // const result = userContacts.find((contact) => {
  //   console.log(contact);
  //   return contact._id === id;
  // });
  // return result;
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
