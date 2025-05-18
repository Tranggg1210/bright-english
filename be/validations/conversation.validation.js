const joi = require('joi');
const { objectId } = require('./custom.validation');

const speakerEnum = ['speakerA', 'speakerB'];

const createConversation = {
  body: joi.object().keys({
    topicId: joi.string().required().custom(objectId).messages({
      'any.required': 'Vui lòng chọn chủ đề',
    }),
    name: joi.string().trim().min(1).required().messages({
      'any.required': 'Vui lòng nhập tên đoạn hội thoại',
      'string.empty': 'Tên đoạn hội thoại không được để trống',
    }),
    listConver: joi.array().items(
      joi.object({
        speaker: joi.string().valid(...speakerEnum).required(),
        text: joi.string().trim().required(),
        audio: joi.string().trim().uri().allow('', null),
      })
    ).required(),
    listInfor: joi.object({
      speakerA: joi.object({
        avatar: joi.string().trim().uri().allow('', null),
        name: joi.string().trim().allow('', null),
      }),
      speakerB: joi.object({
        avatar: joi.string().trim().uri().allow('', null),
        name: joi.string().trim().allow('', null),
      }),
    }),
    description: joi.string().trim().allow('', null),
  }),
};

const getConversations = {
  query: joi.object({
    sortBy: joi.string(),
    limit: joi.number().integer(),
    page: joi.number().integer(),
  }),
};

const getConversationById = {
  params: joi.object({
    conversationId: joi.string().required().custom(objectId),
  }),
};

const updateConversationById = {
  params: joi.object({
    conversationId: joi.string().required().custom(objectId),
  }),
  body: joi.object().keys({
    topicId: joi.string().custom(objectId),
    name: joi.string().trim().min(1),
    listConver: joi.array().items(
      joi.object({
        speaker: joi.string().valid(...speakerEnum),
        text: joi.string().trim(),
        audio: joi.string().trim().uri().allow('', null),
      })
    ),
    listInfor: joi.object({
      speakerA: joi.object({
        avatar: joi.string().trim().uri().allow('', null),
        name: joi.string().trim().allow('', null),
      }),
      speakerB: joi.object({
        avatar: joi.string().trim().uri().allow('', null),
        name: joi.string().trim().allow('', null),
      }),
    }),
    description: joi.string().trim().allow('', null),
  }),
};

const deleteConversationById = {
  params: joi.object({
    conversationId: joi.string().required().custom(objectId),
  }),
};

const getConversationByTopicId = {
  params: joi.object({
    topicId: joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createConversation,
  getConversations,
  getConversationById,
  updateConversationById,
  deleteConversationById,
  getConversationByTopicId,
};
