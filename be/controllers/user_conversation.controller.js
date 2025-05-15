const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const UserConversation = require('../models/user_conversation.model');

const createOrUpdate = catchAsync(async (req, res) => {
  const { userId, conversationId, writingScore, speakingScore } = req.body;

  let userConversation = await UserConversation.findOne({ userId, conversationId });

  if (userConversation) {
    if (writingScore !== undefined) {
      userConversation.writingScore = writingScore;
      userConversation.writingLastLearnedAt = new Date();
    }
    if (speakingScore !== undefined) {
      userConversation.speakingScore = speakingScore;
      userConversation.speakingLastLearnedAt = new Date();
    }
    await userConversation.save();

    res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: 'Cập nhật trạng thái học thành công!',
      data: { userConversation },
    });
  } else {
    userConversation = await UserConversation.create({
      userId,
      conversationId,
      writingScore: writingScore || 0,
      speakingScore: speakingScore || 0,
      writingLastLearnedAt: writingScore !== undefined ? new Date() : null,
      speakingLastLearnedAt: speakingScore !== undefined ? new Date() : null,
    });

    res.status(httpStatus.CREATED).json({
      code: httpStatus.CREATED,
      message: 'Tạo trạng thái học thành công!',
      data: { userConversation },
    });
  }
});

const getByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const data = await UserConversation.find({ userId }).populate('conversationId');

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách trạng thái học thành công!',
    data,
  });
});

module.exports = {
  createOrUpdate,
  getByUserId,
};
