const express = require('express');
const validate = require('../middlewares/validate.middleware');
const studyTrackingTimeController = require('../controllers/study-tracking-time.controller');
const studyTrackingTimeValidation = require('../validations/study-tracking-time.validation');
const { auth, author } = require('../middlewares/auth.middleware');
const { USER_ROLE_ENUM } = require('../constants');

const router = express.Router();

router
  .route('/')
  .post(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(studyTrackingTimeValidation.createStudyTrackingTime),
    studyTrackingTimeController.createStudyTrackingTime,
  );

router
  .route('/:userId')
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(studyTrackingTimeValidation.getStudyTrackingTimesByUser),
    studyTrackingTimeController.getStudyTrackingTimesByUser,
  );

module.exports = router;
