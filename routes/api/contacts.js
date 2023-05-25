const express = require('express');

const {
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  updateFavorite,
  removeContactById,
} = require('../../controllers/contacts');

const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');
const router = express.Router();

router.get('/', getContacts);

router.get('/:contactId', isValidId, getContactById);

router.post('/', validateBody(schemas.addSchema), addContact);   

router.put(
  '/:contactId',
  isValidId,
  validateBody(schemas.addSchema),
  updateContactById,
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateFavorite,
);

router.delete('/:contactId', isValidId, removeContactById);

module.exports = router;