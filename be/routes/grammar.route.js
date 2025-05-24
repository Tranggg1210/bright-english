const express = require('express');
const validate = require('../middlewares/validate.middleware');
const grammarController = require('../controllers/grammar.controller');
const grammarValidation = require('../validations/grammar.validation');
const { auth, author } = require('../middlewares/auth.middleware');
const { USER_ROLE_ENUM } = require('../constants');

const grammarRoute = express.Router();

grammarRoute
  .route('/')
  .post(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    validate(grammarValidation.createGrammar),
    grammarController.createGrammar,
  )
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(grammarValidation.getGrammars),
    grammarController.getGrammars,
  );

grammarRoute
  .route('/:grammarId')
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(grammarValidation.getGrammarById),
    grammarController.getGrammarById,
  )
  .put(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    validate(grammarValidation.updateGrammarById),
    grammarController.updateGrammarById,
  )
  .delete(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    validate(grammarValidation.deleteGrammarById),
    grammarController.deleteGrammarById,
  );

module.exports = grammarRoute;
