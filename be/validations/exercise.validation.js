const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { EXERCISE_TYPE } = require('../constants');

const matchItem = Joi.object({
  id: Joi.string(),
  image: Joi.string().uri().allow('', null),
  content: Joi.string().allow('', null),
  key: Joi.string(),
  index: Joi.number(),
}).custom((value, helpers) => {
  const hasImage = value.image && value.image.trim() !== '';
  const hasContent = value.content && value.content.trim() !== '';
  if (!hasImage && !hasContent) {
    return helpers.message('Mỗi item phải có ít nhất "image" hoặc "content"');
  }
  return value;
});

const question = Joi.object({
  prompt: Joi.string().allow('', null),
  audio: Joi.string().uri().allow('', null),
  dataLeft: Joi.array().items(matchItem),
  dataRight: Joi.array().items(matchItem),
  answer: Joi.any().required(),
  content: Joi.array().items(Joi.custom(objectId)),
});

const createExercise = {
  body: Joi.object({
    topicId: Joi.string().required().custom(objectId),
    type: Joi.string()
      .valid(...Object.values(EXERCISE_TYPE))
      .required(),
    name: Joi.string().required(),
    text: Joi.string().allow('', null).optional(),
    questions: Joi.array().items(question).required(),
  }),
};

const getExercises = {
  query: Joi.object({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getExerciseById = {
  params: Joi.object({
    exerciseId: Joi.string().required().custom(objectId),
  }),
};

const getExerciseByTopicId = {
  params: Joi.object({
    topicId: Joi.string().required().custom(objectId).messages({
      'any.required': 'Thiếu topicId để lấy danh sách từ vựng',
      'string.base': 'topicId phải là một chuỗi hợp lệ',
    }),
  }),
};

const updateExerciseById = {
  params: Joi.object({
    exerciseId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object({
    topicId: Joi.string().custom(objectId),
    type: Joi.string().valid(...Object.values(EXERCISE_TYPE)),
    name: Joi.string(),
    text: Joi.string().allow('', null).optional(),
    questions: Joi.array().items(question),
  }),
};

const deleteExerciseById = {
  params: Joi.object({
    exerciseId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createExercise,
  getExercises,
  getExerciseById,
  updateExerciseById,
  deleteExerciseById,
  getExerciseByTopicId,
};
