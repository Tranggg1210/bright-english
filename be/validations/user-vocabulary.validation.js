const Joi = require('joi');
const { objectId } = require('./custom.validation');

const upsertUserVocabulary = {
  body: Joi.object().keys({
    vocabId: Joi.string().required().custom(objectId).messages({
      'any.required': 'Vui lòng truyền mã từ vựng',
    }),
    isLearn: Joi.boolean().required().messages({
      'any.required': 'Vui lòng truyền trạng thái học',
      'boolean.base': 'Trạng thái học phải là true hoặc false',
    }),
  }),
};

const getUserVocabularies = {
  query: Joi.object({
    limit: Joi.number().integer().min(1),
    page: Joi.number().integer().min(1),
  }),
};

const getUserVocabularyByVocabId = {
  params: Joi.object({
    vocabId: Joi.string().required().custom(objectId).messages({
      'any.required': 'Vui lòng truyền mã từ vựng',
    }),
  }),
};

const getVocabByTopicWithLearnStatus = {
  params: Joi.object({
    topicId: Joi.string().required().custom(objectId).messages({
      'any.required': 'Vui lòng truyền mã từ vựng',
    }),
  }),
};


const deleteUserVocabulary = {
  params: Joi.object({
    vocabId: Joi.string().required().custom(objectId).messages({
      'any.required': 'Vui lòng truyền mã từ vựng',
    }),
  }),
};

module.exports = {
  upsertUserVocabulary,
  getUserVocabularies,
  getUserVocabularyByVocabId,
  deleteUserVocabulary,
  getVocabByTopicWithLearnStatus
};
