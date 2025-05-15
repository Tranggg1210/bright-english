const express = require('express');
const validate = require('../middlewares/validate.middleware');
const reportController = require('../controllers/report.controller');
const reportValidation = require('../validations/report.validation');
const { auth, author } = require('../middlewares/auth.middleware');
const { USER_ROLE_ENUM } = require('../constants');

const reportRoute = express.Router();

reportRoute
  .route('/')
  .post(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(reportValidation.createReport),
    reportController.createReport,
  )
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    validate(reportValidation.getReports),
    reportController.getReports,
  );

reportRoute
  .route('/:reportId')
  .get(
    auth,
    author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]),
    validate(reportValidation.getReportById),
    reportController.getReportById,
  )
  .put(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    validate(reportValidation.updateReportById),
    reportController.updateReportById,
  )
  .delete(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    validate(reportValidation.deleteReportById),
    reportController.deleteReportById,
  );

module.exports = reportRoute;
