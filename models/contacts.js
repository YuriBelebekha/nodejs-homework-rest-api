const fs = require("fs/promises");
const path = require("path");

const shortid = require("shortid");

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    return console.log(error);
  };
};

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
  } catch (error) {
    return console.log(error);
  };  
};

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);

    if (index === -1) {
      return null;
    };

    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    return console.log(error);
  }
  
};

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: shortid(),
      ...name,
      ...email,
      ...phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    return console.log(error);
  }
};

async function updateContactById(id, {name, email, phone}) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if (index === -1) {
      return null;
    };
    contacts[index] = { id, name, email, phone };    
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    return console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,  
  updateContactById,
};