const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (data) => {
  try {
    const contacts = JSON.stringify(data);
    await fs.writeFile(contactsPath, contacts);
  } catch (err) {
    throw err;
  }
};

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    throw err;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === contactId);
    if (!contact) {
      throw new Error(`There is no contact with id = ${contactId}`);
    }
    return contact;
  } catch (err) {
    throw err;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((contact) => contact.id === contactId);
    if (idx === -1) {
      throw new Error(`There is no contact with ID=${contactId}`);
    }
    const newContactsArr = contacts.filter((item) => item.id !== contactId);
    await updateContacts(newContactsArr);
    return contacts[idx];
  } catch (err) {
    throw err;
  }
};

const addContact = async (body) => {
  const newContact = { ...body, id: v4() };
  try {
    const contacts = await listContacts();
    const newContactsArr = [...contacts, newContact];
    updateContacts(newContactsArr);
    return newContact;
  } catch (err) {
    throw err;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      throw new Error(`There is no product with ID=${contactId}`);
    }
    contacts[idx] = { ...contacts[idx], ...body };
    updateContacts(contacts);
    return contacts[idx];
  } catch (err) {
    throw err;
  }
};

const contactsOperations = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

module.exports = contactsOperations;
