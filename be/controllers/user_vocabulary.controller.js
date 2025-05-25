const httpStatus = require('http-status');
const UserVocabulary = require('../models/user_vocabularies.models');
const Vocabulary = require('../models/vocabulary.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const upsertUserVocabulary = catchAsync(async (req, res) => {
  const { vocabId, isLearn } = req.body;
  const userId = req.user._id;

  const data = await UserVocabulary.findOneAndUpdate(
    { userId, vocabId },
    {
      $set: {
        isLearn,
        timeLearn: isLearn ? new Date() : null,
      },
    },
    { new: true, upsert: true },
  );

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Cập nhật trạng thái học từ thành công!',
    data,
  });
});

const getUserVocabularies = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { limit = 10, page = 1 } = req.query;

  const skip = (+page - 1) * +limit;

  const list = await UserVocabulary.find({ userId })
    .populate('vocabId')
    .limit(+limit)
    .skip(skip)
    .sort({ updatedAt: -1 });

  const totalResults = await UserVocabulary.countDocuments({ userId });

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách từ đã học thành công!',
    data: {
      vocabularies: list,
      limit: +limit,
      currentPage: +page,
      totalPage: Math.ceil(totalResults / +limit),
      totalResults,
    },
  });
});

const getUserVocabularyByVocabId = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { vocabId } = req.params;

  const record = await UserVocabulary.findOne({ userId, vocabId });

  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chưa có trạng thái học từ này!');
  }

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy trạng thái học từ thành công!',
    data: record,
  });
});

const deleteUserVocabulary = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { vocabId } = req.params;

  const deleted = await UserVocabulary.findOneAndDelete({ userId, vocabId });

  if (!deleted) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy bản ghi để xoá!');
  }

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Xoá trạng thái học từ thành công!',
    data: deleted,
  });
});

const getVocabByTopicWithLearnStatus = catchAsync(async (req, res) => {
  const { topicId } = req.params;
  const userId = req.user._id;

  const vocabList = await Vocabulary.find({
    $expr: {
      $eq: [{ $toString: '$topicId' }, topicId],
    },
  }).lean();

  if (!vocabList.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy từ vựng nào trong topic này');
  }

  const vocabIdList = vocabList.map((v) => v._id.toString());

  const learnedVocab = await UserVocabulary.find({
    userId,
    vocabId: { $in: vocabIdList },
  })
    .select('vocabId')
    .lean();

  const learnedSet = new Set(learnedVocab.map((item) => item.vocabId.toString()));

  const result = vocabList.map((vocab) => ({
    ...vocab,
    isLearn: learnedSet.has(vocab._id.toString()),
  }));

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách từ vựng thành công',
    data: result,
  });
});

const resetLearnedVocabulary = catchAsync(async (req, res) => {
  const { topicId } = req.params;
  const userId = req.user._id;

  const vocabList = await Vocabulary.find({
    $expr: {
      $eq: [{ $toString: '$topicId' }, topicId],
    },
  }).select('_id').lean();

  const vocabIdList = vocabList.map((v) => v._id.toString());

  if (!vocabIdList.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy từ vựng nào trong topic này');
  }

  const result = await UserVocabulary.deleteMany({
    userId,
    vocabId: { $in: vocabIdList },
  });

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: `Đã reset ${result.deletedCount} từ vựng đã học`,
  });
});

module.exports = {
  upsertUserVocabulary,
  getUserVocabularies,
  getUserVocabularyByVocabId,
  deleteUserVocabulary,
  getVocabByTopicWithLearnStatus,
  resetLearnedVocabulary,
};
