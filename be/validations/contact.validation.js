const joi = require('joi');
const { objectId } = require('./custom.validation');

const createContact = {
  body: joi.object().keys({
    fullName: joi.string().min(2).max(100).required().messages({
      'any.required': 'Vui lòng điền họ tên',
      'string.base': 'Họ tên phải là chuỗi',
      'string.min': 'Họ tên ít nhất 2 ký tự',
      'string.max': 'Họ tên không vượt quá 100 ký tự',
    }),
    email: joi.string().email().required().messages({
      'any.required': 'Vui lòng điền email',
      'string.email': 'Email không hợp lệ',
    }),
    phone: joi.string().min(9).max(15).required().messages({
      'any.required': 'Vui lòng điền số điện thoại',
      'string.min': 'Số điện thoại ít nhất 9 ký tự',
      'string.max': 'Số điện thoại không vượt quá 15 ký tự',
    }),
    message: joi.string().required().messages({
      'any.required': 'Vui lòng nhập nội dung liên hệ',
    }),
    status: joi.string().valid('unread', 'read', 'replied').default('unread'),
  }),
};

const getContacts = {
  query: joi.object({
    sortBy: joi.string(),
    limit: joi.number().integer(),
    page: joi.number().integer(),
  }),
};

const getContactById = {
  params: joi.object({
    contactId: joi.string().required().custom(objectId),
  }),
};

const updateContactById = {
  params: joi.object({
    contactId: joi.string().required().custom(objectId),
  }),
  body: joi.object().keys({
    fullName: joi.string().min(2).max(100).messages({
      'string.base': 'Họ tên phải là chuỗi',
      'string.min': 'Họ tên ít nhất 2 ký tự',
      'string.max': 'Họ tên không vượt quá 100 ký tự',
    }),
    email: joi.string().email().messages({
      'string.email': 'Email không hợp lệ',
    }),
    phone: joi.string().min(9).max(15).messages({
      'string.min': 'Số điện thoại ít nhất 9 ký tự',
      'string.max': 'Số điện thoại không vượt quá 15 ký tự',
    }),
    message: joi.string(),
    status: joi.string().valid('unread', 'read', 'replied'),
  }),
};

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContactById,
};
