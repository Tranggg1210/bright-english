const joi = require('joi');
const { objectId } = require('./custom.validation');

const createReport = {
  body: joi.object().keys({
    userId: joi.string().required().custom(objectId).messages({
      'any.required': 'UserId không được để trống',
      'string.base': 'UserId phải là chuỗi',
      'string.pattern.name': 'UserId không hợp lệ',
    }),
    title: joi.string().required().trim().messages({
      'any.required': 'Vui lòng nhập tiêu đề báo cáo',
      'string.base': 'Tiêu đề phải là chuỗi',
    }),
    message: joi.string().required().max(400).trim().messages({
      'any.required': 'Vui lòng nhập nội dung báo cáo',
      'string.base': 'Nội dung phải là chuỗi',
      'string.max': 'Nội dung không được vượt quá 400 ký tự',
    }),
    status: joi.string().valid('unread', 'read', 'replied').optional(),
  }),
};

const getReports = {
  query: joi.object({
    sortBy: joi.string().optional(),
    limit: joi.number().integer().optional(),
    page: joi.number().integer().optional(),
  }),
};

const getReportById = {
  params: joi.object({
    reportId: joi.string().required().custom(objectId).messages({
      'any.required': 'ReportId không được để trống',
    }),
  }),
};

const updateReportById = {
  params: joi.object({
    reportId: joi.string().required().custom(objectId).messages({
      'any.required': 'ReportId không được để trống',
    }),
  }),
  body: joi.object().keys({
    userId: joi.string().optional().custom(objectId),
    title: joi.string().optional().trim(),
    message: joi.string().optional().max(400).trim(),
    status: joi.string().valid('unread', 'read', 'replied').optional(),
  }),
};

const deleteReportById = {
  params: joi.object({
    reportId: joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createReport,
  getReports,
  getReportById,
  updateReportById,
  deleteReportById,
};
