const joi = require('joi');
const { objectId } = require('./custom.validation');

const createStudyTrackingTime = {
  body: joi.object().keys({
    userId: joi.string().required().custom(objectId),
    timeLearn: joi.number().required().min(1).messages({
      'any.required': 'Vui lòng cung cấp thời gian học',
      'number.base': 'Thời gian học phải là số',
      'number.min': 'Thời gian học phải lớn hơn 0',
    }),
    date: joi.date().required().messages({
      'any.required': 'Vui lòng cung cấp ngày học',
      'date.base': 'Ngày học không hợp lệ',
    }),
  }),
};

const getStudyTrackingTimesByUser = {
  params: joi.object().keys({
    userId: joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createStudyTrackingTime,
  getStudyTrackingTimesByUser,
};
