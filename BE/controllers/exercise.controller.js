const httpStatus = require('http-status');
const Exercise = require('../models/exercise.model');
const Topic = require('../models/topic.model');
const Log = require('../models/log.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { v4: uuidv4 } = require('uuid');

const autoGenerateAnswerIds = (questions = []) => {
  return questions.map((question) => {
    if (Array.isArray(question.answer)) {
      question.answer = question.answer.map((a) => ({
        id: a?.id || uuidv4(),
        ...a,
      }));
    }
    return question;
  });
};

const createExercise = catchAsync(async (req, res) => {
  const { topicId } = req.body;

  const topic = await Topic.findById(topicId);
  if (!topic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy chủ đề!');
  }

  if (req.body.questions) {
    req.body.questions = autoGenerateAnswerIds(req.body.questions);
  }

  const exercise = await Exercise.create(req.body);
  res.status(httpStatus.CREATED).json({
    code: httpStatus.CREATED,
    message: 'Tạo bài tập thành công!',
    data: { exercise },
  });
});

const getExercises = catchAsync(async (req, res) => {
  const { limit = 10, page = 1, sortBy = 'createdAt:desc' } = req.query;
  const skip = (+page - 1) * +limit;

  const sort = {};
  sortBy.split(',').forEach((sortOption) => {
    const [key, order] = sortOption.split(':');
    sort[key.trim()] = order?.trim() === 'asc' ? 1 : -1;
  });

  const exercises = await Exercise.find().limit(+limit).skip(skip).sort(sort);
  const totalResults = await Exercise.countDocuments();

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách bài tập thành công!',
    data: {
      exercises,
      limit: +limit,
      currentPage: +page,
      totalPage: Math.ceil(totalResults / +limit),
      totalResults,
    },
  });
});

const getExerciseById = catchAsync(async (req, res) => {
  const exercise = await Exercise.findById(req.params.exerciseId);

  if (!exercise) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy bài tập!');
  }

  const topic = await Topic.findById(exercise.topicId);
  if (!topic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy chủ đề!');
  }

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy thông tin bài tập thành công!',
    data: {
      exercise,
      topicName: topic.name,
    },
  });
});

const getExercisesByTopicId = catchAsync(async (req, res) => {
  const topic = await Topic.findById(req.params.topicId);
  if (!topic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy chủ đề!');
  }

  const exercises = await Exercise.find({ topicId: req.params.topicId });

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách bài tập thành công!',
    data: {
      exercises,
      topicName: topic.name,
    },
  });
});

const updateExerciseById = catchAsync(async (req, res) => {
  const exercise = await Exercise.findById(req.params.exerciseId);
  if (!exercise) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy bài tập!');
  }

  Object.assign(exercise, req.body);
  await exercise.save();

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Cập nhật bài tập thành công!',
    data: { exercise },
  });
});

const deleteExerciseById = catchAsync(async (req, res) => {
  const { exerciseId } = req.params;

  const exercise = await Exercise.findById(exerciseId);
  if (!exercise) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy bài tập!');
  }

  // Xoá tất cả logs liên quan đến exercise
  await Log.deleteMany({ exerciseId });

  // Xoá bài tập
  await Exercise.findByIdAndDelete(exerciseId);

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Xóa bài tập và toàn bộ log liên quan thành công!',
    data: { exercise },
  });
});

module.exports = {
  createExercise,
  getExercises,
  getExerciseById,
  updateExerciseById,
  deleteExerciseById,
  getExercisesByTopicId,
};
