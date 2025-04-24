const express = require('express');
const validate = require('../middlewares/validate.middleware');
const topicController = require('../controllers/topic.controller');
const topicValidation = require('../validations/topic.validation');
const { auth, author } = require('../middlewares/auth.middleware');
const { USER_ROLE_ENUM } = require('../constants');

const topicRoute = express.Router();

topicRoute
  .route('/')
  .post(auth, author([USER_ROLE_ENUM.ADMIN]), validate(topicValidation.createTopic), topicController.createTopic)
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(topicValidation.getTopics),
    topicController.getTopics,
  );
topicRoute
  .route('/:topicId')
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(topicValidation.getTopicById),
    topicController.getTopicById,
  )
  .put(auth, author([USER_ROLE_ENUM.ADMIN]), validate(topicValidation.updateTopicById), topicController.updateTopicById)
  .delete(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(topicValidation.deleteTopicById),
    topicController.deleteTopicById,
  );

module.exports = topicRoute;
