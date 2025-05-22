const httpStatus = require('http-status');
const StudyTrackingTime = require('../models/study_tracking_time.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');

const createStudyTrackingTime = catchAsync(async (req, res) => {
  const { userId, timeLearn, date } = req.body;

  const existing = await StudyTrackingTime.findOne({
    userId,
    date: new Date(date.toDateString ? date.toDateString() : date), // reset giờ phút giây
  });

  if (existing) {
    existing.timeLearn += timeLearn;
    await existing.save();
    return res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: 'Cập nhật thời gian học thành công',
      data: { studyTrackingTime: existing },
    });
  }

  const newRecord = await StudyTrackingTime.create({ userId, timeLearn, date });

  res.status(httpStatus.CREATED).json({
    code: httpStatus.CREATED,
    message: 'Tạo bản ghi thời gian học thành công',
    data: { studyTrackingTime: newRecord },
  });
});

const getStudyTrackingTimesByUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'userId không hợp lệ');
  }

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const start = new Date(end);
  start.setDate(end.getDate() - 6);
  start.setHours(0, 0, 0, 0);

  const records = await StudyTrackingTime.find({
    userId,
    date: { $gte: start, $lte: end },
  }).sort({ date: 1 });

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy dữ liệu thời gian học 7 ngày gần nhất thành công',
    data: { records },
  });
});

module.exports = {
  createStudyTrackingTime,
  getStudyTrackingTimesByUser,
};
