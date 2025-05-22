const httpStatus = require('http-status');
const User = require('../models/user.model');
const Log = require('../models/log.model');
const UserConversation = require('../models/user_conversation.model');
const UserVocabulary = require('../models/user_vocabularies.models');
const Exercise = require('../models/exercise.model');
const Vocabulary = require('../models/vocabulary.model');
const Conversation = require('../models/conversation.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cloudinary } = require('../configs/cloudinary.config');

const createUser = catchAsync(async (req, res) => {
  const existingEmail = await User.findOne({ email: req.body.email });
  if (existingEmail) {
    throw new ApiError(httpStatus.CONFLICT, 'Email đã tồn tại');
  }

  const user = await User.create(req.body);

  if (req.file) {
    try {
      const avatar = await cloudinary.uploader.upload(req.file.path);
      user.avatar = avatar.url;
      await user.save(); 
    } catch (error) {
      console.log(error);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Lỗi upload avatar');
    }
  }

  user.password = undefined;

  res.status(httpStatus.CREATED).json({
    code: httpStatus.CREATED,
    message: 'Tạo người dùng thành công',
    data: { user },
  });
});

const getUsers = catchAsync(async (req, res) => {
  const { limit = 10, page = 1, sortBy = 'createdAt:desc' } = req.query;

  const skip = (+page - 1) * +limit;

  const sort = {};
  sortBy.split(',').forEach((sortOption) => {
    const [key, order] = sortOption.split(':');
    sort[key.trim()] = order?.trim() === 'asc' ? 1 : -1;
  });

  const users = await User.find().limit(+limit).skip(skip).sort(sort);
  const totalResults = await User.countDocuments();

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách người dùng thành công',
    data: {
      users,
      limit: +limit,
      currentPage: +page,
      totalPage: Math.ceil(totalResults / +limit),
      totalResults,
    },
  });
});

const getUserById = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy người dùng');
  }

  user.password = undefined;

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy thông tin người dùng thành công',
    data: { user },
  });
});

const updateUserById = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy người dùng');
  }

  Object.assign(user, req.body);

  if (req.file) {
    const avatar = await cloudinary.uploader.upload(req.file.path);
    user.avatar = avatar.url;
  }

  await user.save();
  user.password = undefined;

  res.status(httpStatus.OK).json({
    message: 'Cập nhật thông tin người dùng thành công',
    code: httpStatus.OK,
    data: { user },
  });
});

const deleteUserById = catchAsync(async (req, res) => {
  // Tìm người dùng và xóa
  const user = await User.findByIdAndDelete(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy người dùng');
  }

  await Log.deleteMany({ userId: req.params.userId });
  await UserConversation.deleteMany({ userId: req.params.userId });
  await UserVocabulary.deleteMany({ userId: req.params.userId });

  res.status(httpStatus.OK).json({
    message: 'Xoá người dùng và logs thành công',
    code: httpStatus.OK,
    data: { user },
  });
});


const lockUserById = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy người dùng');
  }

  user.isLocked = !user.isLocked;
  await user.save();

  res.status(httpStatus.OK).json({
    message: user.isLocked ? 'Khoá người dùng thành công' : 'Mở khoá người dùng thành công',
    code: httpStatus.OK,
    data: { user },
  });
});


const getUserProgress = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const totalExercise = await Exercise.countDocuments();

  const doneExerciseAgg = await Log.aggregate([
    { $match: { userId: userId, status: true } },
    { $group: { _id: '$exerciseId' } },
    { $count: 'count' },
  ]);
  const doneExercise = doneExerciseAgg.length ? doneExerciseAgg[0].count : 0;

  const totalVocab = await Vocabulary.countDocuments();

  const doneVocab = await UserVocabulary.countDocuments({
    userId: userId,
    isLearn: true,
  });

  const totalConver = await Conversation.countDocuments();

  const doneConver = await UserConversation.countDocuments({
    userId: userId,
    $or: [{ writingScore: { $gt: 0 } }, { speakingScore: { $gt: 0 } }],
  });

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy tiến độ học tập thành công',
    data: {
      exercise: { done: doneExercise, total: totalExercise },
      vocabulary: { done: doneVocab, total: totalVocab },
      conversation: { done: doneConver, total: totalConver },
    },
  });
});

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  lockUserById,
  getUserProgress
};
