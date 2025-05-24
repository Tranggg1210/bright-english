const joi = require('joi');

const createStudyTrackingTime = {
  body: joi.object().keys({
    timeLearn: joi.number().required().min(0).messages({
      'any.required': 'Vui lòng cung cấp thời gian học',
      'number.base': 'Thời gian học phải là số',
      'number.min': 'Thời gian học phải lớn hơn hoặc bằng 0',
    }),
  }),
};


module.exports = {
  createStudyTrackingTime,
};
