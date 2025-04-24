const joi = require('joi');
const { objectId } = require('./custom.validation');

const createVocabulary = {
  body: joi.object().keys({
    topicId: joi.string().required().custom(objectId).messages({
      'any.required': 'Vui lòng chọn chủ đề',
      'string.base': 'ID chủ đề phải là một chuỗi hợp lệ',
    }),
    word: joi.string().trim().min(1).required().messages({
      'any.required': 'Vui lòng nhập từ vựng',
      'string.empty': 'Từ vựng không được để trống',
    }),
    translate: joi.string().trim().min(1).required().messages({
      'any.required': 'Vui lòng nhập nghĩa của từ',
      'string.empty': 'Nghĩa của từ không được để trống',
    }),
    transcription: joi.string().trim().allow('', null),
    image: joi.string().trim().uri().allow('', null),
    description: joi.string().trim().allow('', null),
  }),
};

const getVocabularies = {
  query: joi.object({
    sortBy: joi.string(),
    limit: joi.number().integer(),
    page: joi.number().integer(),
  }),
};

const getVocabularyById = {
  params: joi.object({
    vocabularyId: joi.string().required().custom(objectId),
  }),
};

const getVocabularyByTopicId = {
  params: joi.object({
    topicId: joi.string().required().custom(objectId).messages({
      'any.required': 'Thiếu topicId để lấy danh sách từ vựng',
      'string.base': 'topicId phải là một chuỗi hợp lệ',
    }),
  }),
};

const updateVocabularyById = {
  params: joi.object({
    vocabularyId: joi.string().required().custom(objectId),
  }),
  body: joi.object().keys({
    topicId: joi.string().custom(objectId),
    word: joi.string().trim().min(1),
    translate: joi.string().trim().min(1),
    transcription: joi.string().trim().allow('', null),
    image: joi.string().trim().uri().allow('', null),
    description: joi.string().trim().allow('', null),
  }),
};

const deleteVocabularyById = {
  params: joi.object({
    vocabularyId: joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createVocabulary,
  getVocabularies,
  getVocabularyById,
  getVocabularyByTopicId,
  updateVocabularyById,
  deleteVocabularyById,
};
