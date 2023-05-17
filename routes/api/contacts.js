const express = require('express');

const {
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById
} = require('../../controllers/contacts');
const { validateBody } = require('../../middlewares');
const { contactSchema } = require('../../schemas/contacts');

const router = express.Router();

router.get('/', getContacts);
router.get('/:contactId', getContactById);
router.post('/', validateBody(contactSchema), addContact);
router.put('/:contactId', validateBody(contactSchema), updateContactById);
router.delete('/:contactId', removeContactById);

module.exports = router;