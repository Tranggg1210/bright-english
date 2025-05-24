const joi = require('joi');
const { objectId } = require('./custom.validation');

const createGrammar = {
  body: joi.object().keys({
    title: joi.string().min(2).max(500).required().messages({
      'any.required': 'Vui lòng điền tiêu đề bài ngữ pháp',
      'string.base': 'Tiêu đề phải là chuỗi',
      'string.min': 'Tiêu đề phải có ít nhất 2 ký tự',
      'string.max': 'Tiêu đề không được vượt quá 500 ký tự',
    }),
    description: joi.string().max(500).allow('').messages({
      'string.base': 'Mô tả phải là chuỗi',
      'string.max': 'Mô tả không được vượt quá 500 ký tự',
    }),
    content: joi.string().required().messages({
      'any.required': 'Vui lòng nhập nội dung bài ngữ pháp',
      'string.base': 'Nội dung phải là chuỗi',
    }),
    source: joi.string().uri().allow('').messages({
      'string.uri': 'Link nguồn phải là URL hợp lệ',
    }),
  }),
};

const getGrammars = {
  query: joi.object({
    sortBy: joi.string(),
    limit: joi.number().integer(),
    page: joi.number().integer(),
  }),
};

const getGrammarById = {
  params: joi.object({
    grammarId: joi.string().required().custom(objectId),
  }),
};

const updateGrammarById = {
  params: joi.object({
    grammarId: joi.string().required().custom(objectId),
  }),
  body: joi.object().keys({
    title: joi.string().min(2).max(500).messages({
      'string.base': 'Tiêu đề phải là chuỗi',
      'string.min': 'Tiêu đề phải có ít nhất 2 ký tự',
      'string.max': 'Tiêu đề không được vượt quá 500 ký tự',
    }),
    description: joi.string().max(500).allow('').messages({
      'string.base': 'Mô tả phải là chuỗi',
      'string.max': 'Mô tả không được vượt quá 500 ký tự',
    }),
    content: joi.string().messages({
      'string.base': 'Nội dung phải là chuỗi',
    }),
    source: joi.string().uri().allow('').messages({
      'string.uri': 'Link nguồn phải là URL hợp lệ',
    }),
  }),
};

const deleteGrammarById = {
  params: joi.object({
    grammarId: joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createGrammar,
  getGrammars,
  getGrammarById,
  updateGrammarById,
  deleteGrammarById,
};
