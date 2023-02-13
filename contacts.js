const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");

const readContacts = async () => { 
    const data = await fs.readFile(contactsPath, "utf8");
    const dataParse = JSON.parse(data);
    return dataParse;
}

const listContacts = async () =>{
  try {
    const contactsList = await readContacts();
    return contactsList;
  } catch (error) {
    console.error(error.message);
  }
}

const getContactById = async (contactId) => {
  try {
    const contact = await readContacts();
    return (result = contact.filter((e) => e.id == contactId));
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contact = await readContacts();
    const newContact = {
      id: Math.random(),
      name,
      email,
      phone,
    };
    const contactsList = JSON.stringify([newContact, ...contact], null, "\t");
    await fs.writeFile(contactsPath, contactsList);
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
}



const removeContact = async (contactId)=>{
  try {
    const contact = await readContacts();
    const remContact = contact.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(remContact));
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
};
