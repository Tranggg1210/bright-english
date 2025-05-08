const express = require('express');
const validate = require('../middlewares/validate.middleware');
const vocabularyController = require('../controllers/vocabulary.controller');
const vocabularyValidation = require('../validations/vocabulary.validation');
const { auth, author } = require('../middlewares/auth.middleware');
const { USER_ROLE_ENUM } = require('../constants');
const upload = require('../middlewares/multer.middleware');

const vocabularyRoute = express.Router();

vocabularyRoute
  .route('/')
  .post(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    upload.single('image'),
    validate(vocabularyValidation.createVocabulary),
    vocabularyController.createVocabulary,
  )
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(vocabularyValidation.getVocabularies),
    vocabularyController.getVocabularies,
  );

vocabularyRoute
  .route('/:vocabularyId')
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(vocabularyValidation.getVocabularyById),
    vocabularyController.getVocabularyById,
  )
  .put(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    upload.single('image'),
    validate(vocabularyValidation.updateVocabularyById),
    vocabularyController.updateVocabularyById,
  )
  .delete(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    validate(vocabularyValidation.deleteVocabularyById),
    vocabularyController.deleteVocabularyById,
  );

vocabularyRoute
  .route('/topic/:topicId')
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(vocabularyValidation.getVocabularyByTopicId),
    vocabularyController.getVocabularyByTopicId,
  );

module.exports = vocabularyRoute;
