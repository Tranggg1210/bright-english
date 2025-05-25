const httpStatus = require('http-status');
const Vocabulary = require('../models/vocabulary.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cloudinary } = require('../configs/cloudinary.config');

const createVocabulary = catchAsync(async (req, res) => {
  const vocabulary = await Vocabulary.create(req.body);

  if (req.file) {
    try {
      const image = await cloudinary.uploader.upload(req.file.path);
      vocabulary.image = image.url;
      await vocabulary.save();
    } catch (error) {
      console.log(error);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Lỗi upload image');
    }
  }

  res.status(httpStatus.CREATED).json({
    code: httpStatus.CREATED,
    message: 'Tạo thẻ từ vựng thành công!',
    data: { vocabulary },
  });
});

const getVocabularies = catchAsync(async (req, res) => {
  const { limit = 10, page = 1, sortBy = 'createdAt:desc' } = req.query;

  const skip = (+page - 1) * +limit;

  const sort = {};
  sortBy.split(',').forEach((sortOption) => {
    const [key, order] = sortOption.split(':');
    sort[key.trim()] = order?.trim() === 'asc' ? 1 : -1;
  });

  const vocabularies = await Vocabulary.find().limit(+limit).skip(skip).sort(sort).lean();
  const totalResults = await Vocabulary.countDocuments();

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách từ vựng thành công!',
    data: {
      vocabularies,
      limit: +limit,
      currentPage: +page,
      totalPage: Math.ceil(totalResults / +limit),
      totalResults,
    },
  });
});

const getVocabularyById = catchAsync(async (req, res) => {
  const vocabulary = await Vocabulary.findById(req.params.vocabularyId);
  if (!vocabulary) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy từ vựng!');
  }

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy thông tin từ vựng thành công!',
    data: { vocabulary },
  });
});

const getVocabularyByTopicId = catchAsync(async (req, res) => {
  const topicId = req.params.topicId;

  const vocabularies = await Vocabulary.find({
    $expr: {
      $eq: [{ $toString: '$topicId' }, topicId],
    },
  }).lean();

  if (vocabularies.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy danh sách từ vựng theo topic!');
  }

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách từ vựng theo topic thành công!',
    data: { vocabularies },
  });
});

const updateVocabularyById = catchAsync(async (req, res) => {
  const vocabulary = await Vocabulary.findById(req.params.vocabularyId);
  if (!vocabulary) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy từ vựng!');
  }

  Object.assign(vocabulary, req.body);

  if (req.file) {
    const image = await cloudinary.uploader.upload(req.file.path);
    vocabulary.image = image.url;
  }

  await vocabulary.save();

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Cập nhật thông tin từ vựng thành công!',
    data: { vocabulary },
  });
});

const deleteVocabularyById = catchAsync(async (req, res) => {
  const vocabulary = await Vocabulary.findByIdAndDelete(req.params.vocabularyId);
  if (!vocabulary) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy từ vựng!');
  }

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Xoá từ vựng thành công!',
    data: { vocabulary },
  });
});

module.exports = {
  createVocabulary,
  getVocabularies,
  getVocabularyById,
  updateVocabularyById,
  deleteVocabularyById,
  getVocabularyByTopicId,
};
