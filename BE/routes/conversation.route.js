const express = require('express');
const validate = require('../middlewares/validate.middleware');
const conversationController = require('../controllers/conversation.controller');
const conversationValidation = require('../validations/conversation.validation');
const { auth, author } = require('../middlewares/auth.middleware');
const { USER_ROLE_ENUM } = require('../constants');

const conversationRoute = express.Router();

conversationRoute
  .route('/')
  .post(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    validate(conversationValidation.createConversation),
    conversationController.createConversation
  )
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(conversationValidation.getConversations),
    conversationController.getConversations
  );

conversationRoute
  .route('/:conversationId')
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(conversationValidation.getConversationById),
    conversationController.getConversationById
  )
  .put(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    validate(conversationValidation.updateConversationById),
    conversationController.updateConversationById
  )
  .delete(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    validate(conversationValidation.deleteConversationById),
    conversationController.deleteConversationById
  );

conversationRoute
  .route('/topic/:topicId')
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(conversationValidation.getConversationByTopicId),
    conversationController.getConversationByTopicId
  );

module.exports = conversationRoute;
