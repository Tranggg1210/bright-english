const express = require('express');
const validate = require('../middlewares/validate.middleware');
const contactController = require('../controllers/contact.controller');
const contactValidation = require('../validations/contact.validation');
const { auth, author } = require('../middlewares/auth.middleware');
const { USER_ROLE_ENUM } = require('../constants');

const contactRoute = express.Router();

contactRoute
  .route('/')
  .post(validate(contactValidation.createContact), contactController.createContact)
  .get(auth, author([USER_ROLE_ENUM.ADMIN]), validate(contactValidation.getContacts), contactController.getContacts);

contactRoute
  .route('/:contactId')
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    validate(contactValidation.getContactById),
    contactController.getContactById,
  )
  .put(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    validate(contactValidation.updateContactById),
    contactController.updateContactById,
  )

module.exports = contactRoute;
