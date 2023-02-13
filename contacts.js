const path = require("path");
const fs = require("fs/promises");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const list = await fs.readFile(contactsPath, "utf-8");
  const allList = JSON.parse(list);
  return allList;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
};
