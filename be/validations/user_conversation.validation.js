const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrUpdate = {
  body: Joi.object({
    userId: Joi.string().required().custom(objectId),
    conversationId: Joi.string().required().custom(objectId),
    writingScore: Joi.number().min(0).max(100).optional(),
    speakingScore: Joi.number().min(0).max(100).optional(),
  }),
};

const getByUserId = {
  params: Joi.object({
    userId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createOrUpdate,
  getByUserId,
};
