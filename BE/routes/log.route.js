const express = require('express');
const validate = require('../middlewares/validate.middleware');
const logController = require('../controllers/log.controller');
const logValidation = require('../validations/log.validation');
const { auth, author } = require('../middlewares/auth.middleware');
const { USER_ROLE_ENUM } = require('../constants');

const logRoute = express.Router();

logRoute
  .route('/')
  .post(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(logValidation.createLog),
    logController.createAndUpdateLog,
  )
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(logValidation.getLogs),
    logController.getLogs,
  );

logRoute
  .route('/:logId')
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(logValidation.getLogs),
    logController.getLogById,
  )
  .put(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    validate(logValidation.updateLog),
    logController.updateLogById,
  )
  .delete(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    validate(logValidation.getLogs),
    logController.deleteLogById,
  );

logRoute
  .route('/exercise/:exerciseId')
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(logValidation.getLogByExerciseId),
    logController.getLogByExerciseId,
  );

module.exports = logRoute;
