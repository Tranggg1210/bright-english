const express = require('express');
const validate = require('../middlewares/validate.middleware');
const studyTrackingTimeController = require('../controllers/study-tracking-time.controller');
const studyTrackingTimeValidation = require('../validations/study-tracking-time.validation');
const { auth, author } = require('../middlewares/auth.middleware');
const { USER_ROLE_ENUM } = require('../constants');

const studyTrackTimeRoute = express.Router();

studyTrackTimeRoute
  .route('/')
  .post(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(studyTrackingTimeValidation.createStudyTrackingTime),
    studyTrackingTimeController.createOrUpdateTodayStudyTime,
  )
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    studyTrackingTimeController.getStudyTrackingTimesByUser,
  );

module.exports = studyTrackTimeRoute;
