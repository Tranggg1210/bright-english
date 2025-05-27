const httpStatus = require('http-status');
const Conversation = require('../models/conversation.model');
const Topic = require('../models/topic.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createConversation = catchAsync(async (req, res) => {
  const { topicId } = req.body;
  const topic = await Topic.findById(topicId);
  if (!topic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy chủ đề!');
  }

  const conversation = await Conversation.create(req.body);

  res.status(httpStatus.CREATED).json({
    code: httpStatus.CREATED,
    message: 'Tạo đoạn hội thoại thành công!',
    data: { conversation },
  });
});

const getConversations = catchAsync(async (req, res) => {
  const { limit = 10, page = 1, sortBy = 'createdAt:desc' } = req.query;
  const skip = (+page - 1) * +limit;

  const sort = {};
  sortBy.split(',').forEach((sortOption) => {
    const [key, order] = sortOption.split(':');
    sort[key.trim()] = order?.trim() === 'asc' ? 1 : -1;
  });

  const conversations = await Conversation.find().limit(+limit).skip(skip).sort(sort);
  const totalResults = await Conversation.countDocuments();

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách hội thoại thành công!',
    data: {
      conversations,
      limit: +limit,
      currentPage: +page,
      totalPage: Math.ceil(totalResults / +limit),
      totalResults,
    },
  });
});

const getConversationById = catchAsync(async (req, res) => {
  const conversation = await Conversation.findById(req.params.conversationId);
  if (!conversation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy đoạn hội thoại!');
  }

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy thông tin đoạn hội thoại thành công!',
    data: { conversation },
  });
});

const getConversationByTopicId = catchAsync(async (req, res) => {
  const conversations = await Conversation.find({ topicId: req.params.topicId });
  if (!conversations.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy hội thoại theo chủ đề!');
  }

  const flashcardConversation = conversations.map(({ _id, name }) => ({
    _id,
    name
  }));

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách hội thoại theo chủ đề thành công!',
    data: { conversations: flashcardConversation },
  });
});

const updateConversationById = catchAsync(async (req, res) => {
  const conversation = await Conversation.findById(req.params.conversationId);
  if (!conversation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy đoạn hội thoại!');
  }

  Object.assign(conversation, req.body);
  await conversation.save();

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Cập nhật đoạn hội thoại thành công!',
    data: { conversation },
  });
});

const deleteConversationById = catchAsync(async (req, res) => {
  const conversation = await Conversation.findByIdAndDelete(req.params.conversationId);
  if (!conversation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy đoạn hội thoại!');
  }

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Xóa đoạn hội thoại thành công!',
    data: { conversation },
  });
});

module.exports = {
  createConversation,
  getConversations,
  getConversationById,
  updateConversationById,
  deleteConversationById,
  getConversationByTopicId,
};
