const joi = require('joi');
const { objectId } = require('./custom.validation');

const createLog = {
  body: joi.object().keys({
    exerciseId: joi.string().required().messages({
      'any.required': 'Vui lòng cung cấp exerciseId',
      'string.base': 'exerciseId phải là một chuỗi hợp lệ',
    }),
    questions: joi
      .array()
      .items(
        joi.object({
          questionId: joi.string().required(),
          userAnswers: joi
            .array()
            .items(
              joi.object({
                content: joi.string().required(),
                isCorrect: joi.boolean().required(),
              }),
            )
            .required(),
        }),
      )
      .required(),
    status: joi.boolean().required(),
  }),
};

const updateLog = {
  body: joi
    .object()
    .keys({
      exerciseId: joi.string().optional().custom(objectId),
      questions: joi
        .array()
        .items(
          joi.object({
            questionId: joi.string().required().messages({
              'any.required': 'Vui lòng cung cấp questionId',
            }),
            userAnswers: joi
              .array()
              .items(
                joi.object({
                  content: joi.string().required().messages({
                    'any.required': 'Vui lòng cung cấp câu trả lời',
                  }),
                  isCorrect: joi.boolean().required().messages({
                    'any.required': 'Vui lòng chỉ rõ câu trả lời đúng hay sai',
                  }),
                }),
              )
              .required()
              .messages({
                'any.required': 'Vui lòng cung cấp danh sách câu trả lời',
              }),
          }),
        )
        .optional(),
      status: joi.boolean().optional(),
    })
    .or('exerciseId', 'questions', 'status')
    .messages({
      'object.missing': 'Ít nhất một trong các trường exerciseId, status hoặc questions là bắt buộc',
    }),
};

const getLogs = {
  query: joi.object({
    exerciseId: joi.string().optional(),
    limit: joi.number().integer().min(1).default(10),
    page: joi.number().integer().min(1).default(1),
    sortBy: joi.string().default('createdAt:desc'),
  }),
};

const getLogByExerciseId = {
  params: joi.object({
    exerciseId: joi.string().required().messages({
      'any.required': 'Vui lòng cung cấp exerciseId',
      'string.base': 'exerciseId phải là một chuỗi hợp lệ',
    }),
  }),
  query: joi.object({
    sortBy: joi.string().default('createdAt:desc').messages({
      'string.base': 'sortBy phải là một chuỗi hợp lệ',
    }),
  }),
};

module.exports = {
  createLog,
  updateLog,
  getLogs,
  getLogByExerciseId,
};
