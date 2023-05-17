const contacts = require('../models/contacts');

const { HttpError, ctrlWrapper } = require('../helpers');


const getContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);  
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, 'Not found');
  };
  res.json(result);
};

const addContact = async (req, res) => {  
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);  
};

const updateContactById = async (req, res) => {  
  const { contactId } = req.params;
  const result = await contacts.updateContactById(contactId, req.body);
  if (!result) {
    throw HttpError(404, 'Not found');
  };
  res.json(result);  
};

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContactById(contactId);
  if (!result) {
    throw HttpError(404, 'Not found');
  };
  res.json({
    message: 'Delete success'
  });  
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  removeContactById: ctrlWrapper(removeContactById),
};