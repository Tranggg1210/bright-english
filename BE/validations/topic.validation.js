const joi = require('joi');
const { objectId } = require('./custom.validation');

const createTopic = {
  body: joi.object().keys({
    name: joi.string().min(2).max(45).required().messages({
      'any.required': 'Vui lòng điền tên chủ đề',
      'string.base': 'Tên chủ đề phải là một chuỗi',
      'string.min': 'Tên chủ đề phải có ít nhất 2 ký tự',
      'string.max': 'Tên chủ đề không được vượt quá 45 ký tự',
    }),
  }),
};

const getTopics = {
  query: joi.object({
    sortBy: joi.string(),
    limit: joi.number().integer(),
    page: joi.number().integer(),
  }),
};

const getTopicById = {
  params: joi.object({
    topicId: joi.string().required().custom(objectId),
  }),
};

const updateTopicById = {
  params: joi.object({
    topicId: joi.string().required().custom(objectId),
  }),
  body: joi.object().keys({
    name: joi.string().min(2).max(45).required().messages({
      'any.required': 'Vui lòng điền tên chủ đề',
      'string.base': 'Tên chủ đề phải là một chuỗi',
      'string.min': 'Tên chủ đề phải có ít nhất 2 ký tự',
      'string.max': 'Tên chủ đề không được vượt quá 45 ký tự',
    }),
  }),
};

const deleteTopicById = {
  params: joi.object({
    topicId: joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createTopic,
  getTopics,
  getTopicById,
  updateTopicById,
  deleteTopicById,
};
