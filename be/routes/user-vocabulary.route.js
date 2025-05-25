const express = require('express');
const validate = require('../middlewares/validate.middleware');
const userVocabularyController = require('../controllers/user_vocabulary.controller');
const userVocabularyValidation = require('../validations/user-vocabulary.validation');
const { auth, author } = require('../middlewares/auth.middleware');
const { USER_ROLE_ENUM } = require('../constants');

const userVocabularyRoute = express.Router();

userVocabularyRoute
  .route('/')
  .post(
    auth,
    author([USER_ROLE_ENUM.USER, USER_ROLE_ENUM.ADMIN]),
    validate(userVocabularyValidation.upsertUserVocabulary),
    userVocabularyController.upsertUserVocabulary,
  )
  .get(
    auth,
    author([USER_ROLE_ENUM.USER, USER_ROLE_ENUM.ADMIN]),
    validate(userVocabularyValidation.getUserVocabularies),
    userVocabularyController.getUserVocabularies,
  );

userVocabularyRoute
  .route('/:vocabId')
  .get(
    auth,
    author([USER_ROLE_ENUM.USER, USER_ROLE_ENUM.ADMIN]),
    validate(userVocabularyValidation.getUserVocabularyByVocabId),
    userVocabularyController.getUserVocabularyByVocabId,
  )
  .delete(
    auth,
    author([USER_ROLE_ENUM.USER, USER_ROLE_ENUM.ADMIN]),
    validate(userVocabularyValidation.deleteUserVocabulary),
    userVocabularyController.deleteUserVocabulary,
  );

userVocabularyRoute
  .route('/status/:topicId')
  .get(
    auth,
    author([USER_ROLE_ENUM.USER, USER_ROLE_ENUM.ADMIN]),
    validate(userVocabularyValidation.getVocabByTopicWithLearnStatus),
    userVocabularyController.getVocabByTopicWithLearnStatus,
  );

userVocabularyRoute
  .route('/reset-learned/:topicId')
  .delete(
    auth,
    author([USER_ROLE_ENUM.USER, USER_ROLE_ENUM.ADMIN]),
    validate(userVocabularyValidation.getVocabByTopicWithLearnStatus),
    userVocabularyController.resetLearnedVocabulary,
  );

module.exports = userVocabularyRoute;
