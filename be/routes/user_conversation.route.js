const express = require('express');
const validate = require('../middlewares/validate.middleware');
const userConversationValidation = require('../validations/user_conversation.validation');
const userConversationController = require('../controllers/user_conversation.controller');
const { auth } = require('../middlewares/auth.middleware');

const router = express.Router();

router
  .route('/')
  .post(
    auth,
    validate(userConversationValidation.createOrUpdate),
    userConversationController.createOrUpdate
  );

router
  .route('/:userId')
  .get(
    auth,
    validate(userConversationValidation.getByUserId),
    userConversationController.getByUserId
  );

module.exports = router;
