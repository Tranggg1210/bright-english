const httpStatus = require('http-status');
const Log = require('../models/log.model');
const Exercise = require('../models/exercise.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createAndUpdateLog = catchAsync(async (req, res) => {
  const { exerciseId } = req.body;
  const { _id: userId } = req.user;
  req.body.userId = userId;

  if (req.user.isLocked) {
    return res.status(httpStatus.FORBIDDEN).json({
      code: httpStatus.FORBIDDEN,
      message: 'Tài khoản đã bị khoá!',
    });
  }

  const exercise = await Exercise.findById(exerciseId);
  if (!exercise) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy bài tập!');
  }

  const existingLog = await Log.findOne({ exerciseId });

  let log;
  if (existingLog) {
    existingLog.set(req.body);
    log = await existingLog.save();
  } else {
    log = await Log.create(req.body);
  }

  res.status(httpStatus.CREATED).json({
    code: httpStatus.CREATED,
    message: existingLog ? 'Cập nhật log bài tập thành công!' : 'Tạo log bài tập thành công!',
    data: { log },
  });
});

const getLogs = catchAsync(async (req, res) => {
  const { exerciseId } = req.query;
  const { limit = 10, page = 1, sortBy = 'createdAt:desc' } = req.query;
  const skip = (+page - 1) * +limit;

  const sort = {};
  sortBy.split(',').forEach((sortOption) => {
    const [key, order] = sortOption.split(':');
    sort[key.trim()] = order?.trim() === 'asc' ? 1 : -1;
  });

  const filter = exerciseId ? { exerciseId } : {};

  const logs = await Log.find(filter).limit(+limit).skip(skip).sort(sort);
  const totalResults = await Log.countDocuments(filter);

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách logs thành công!',
    data: {
      logs,
      limit: +limit,
      currentPage: +page,
      totalPage: Math.ceil(totalResults / +limit),
      totalResults,
    },
  });
});

const getLogById = catchAsync(async (req, res) => {
  const log = await Log.findById(req.params.logId);
  if (!log) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy log!');
  }

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy thông tin log thành công!',
    data: { log },
  });
});

const getLogByExerciseId = catchAsync(async (req, res) => {
  const { exerciseId } = req.params;
  const userId = req.user._id;

  const exercise = await Exercise.findById(exerciseId);
  if (!exercise) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy bài tập!');
  }

  let log = await Log.findOne({ exerciseId, userId });

  if (!log) {
    if (req.user.isLocked) {
      return res.status(httpStatus.FORBIDDEN).json({
        code: httpStatus.FORBIDDEN,
        message: 'Tài khoản đã bị khoá!',
      });
    }
    const formattedQuestions = exercise.questions.map((q) => ({
      questionId: q._id,
      userAnswers: [],
    }));

    log = await Log.create({
      exerciseId,
      userId,
      questions: formattedQuestions,
      status: null,
    });
  }

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy log thành công!',
    data: { log },
  });
});

const updateLogById = catchAsync(async (req, res) => {
  const log = await Log.findById(req.params.logId);
  if (!log) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy log!');
  }

  Object.assign(log, req.body);
  await log.save();

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Cập nhật log thành công!',
    data: { log },
  });
});

const deleteLogById = catchAsync(async (req, res) => {
  const log = await Log.findByIdAndDelete(req.params.logId);
  if (!log) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy log!');
  }

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Xóa log thành công!',
    data: { log },
  });
});

module.exports = {
  createAndUpdateLog,
  getLogs,
  getLogById,
  updateLogById,
  deleteLogById,
  getLogByExerciseId,
};
