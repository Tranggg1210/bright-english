const express = require('express');
const validate = require('../middlewares/validate.middleware');
const exerciseController = require('../controllers/exercise.controller');
const exerciseValidation = require('../validations/exercise.validation');
const { auth, author } = require('../middlewares/auth.middleware');
const { USER_ROLE_ENUM } = require('../constants');

const exerciseRoute = express.Router();

exerciseRoute
  .route('/')
  .post(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    validate(exerciseValidation.createExercise),
    exerciseController.createExercise,
  )
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(exerciseValidation.getExercises),
    exerciseController.getExercises,
  );

exerciseRoute
  .route('/:exerciseId')
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(exerciseValidation.getExerciseById),
    exerciseController.getExerciseById,
  )
  .put(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    validate(exerciseValidation.updateExerciseById),
    exerciseController.updateExerciseById,
  )
  .delete(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    validate(exerciseValidation.deleteExerciseById),
    exerciseController.deleteExerciseById,
  );

exerciseRoute
  .route('/topic/:topicId')
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(exerciseValidation.getExerciseByTopicId),
    exerciseController.getExercisesByTopicId,
  );

module.exports = exerciseRoute;
