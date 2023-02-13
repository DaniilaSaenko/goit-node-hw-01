const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () =>{
  try {
    const data = await fs.readFile(contactsPath);
    return result = JSON.parse(data);

  } catch (error) {
    console.error(error.message);
  }
}

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = {
      id: Math.random(),
      name,
      email,
      phone,
    };
    const contactsList = JSON.stringify([newContact, ...contacts], null, "\t");
    await fs.writeFile(contactsPath, contactsList);
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
}

const getContactById = async (contactId) =>{
  try {
    const data = await fs.readFile(contactsPath);
    return result = JSON.parse(data).find((data) => data.id == contactId);
  } catch (error) {
    console.error(error.message);
  }
}

const removeContact = async (contactId)=>{
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const index = await contacts.findIndex((e) => e.id === contactId);
    if (index === -1) {
      return null;
    }
    const removedContact = contacts.splice(index, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
};
