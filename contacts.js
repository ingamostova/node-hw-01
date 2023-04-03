const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db", "contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

function updateContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
}

function listContacts() {
  return readContacts();
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  return contact;
}

async function removeContact(contactId) {
  const contacts = await readContacts();

  const contactToDelete = contacts.find((contact) => contact.id === contactId);
  const idx = contacts.indexOf(contactToDelete);
  const deletedContact = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return deletedContact;
}

async function addContact(contact) {
  const contacts = await readContacts();
  const newContact = { ...contact, id: nanoid() };

  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
