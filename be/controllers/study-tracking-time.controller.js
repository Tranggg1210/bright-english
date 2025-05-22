const httpStatus = require('http-status');
const StudyTrackingTime = require('../models/study_tracking_time.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');

const createOrUpdateTodayStudyTime = catchAsync(async (req, res) => {
  const { userId, timeLearn, date } = req.body;

  if (!userId || typeof timeLearn !== 'number' || !date) {
    return res.status(400).json({ message: 'Thiếu userId, timeLearn hoặc date' });
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return res.status(400).json({ message: 'Ngày không hợp lệ' });
  }

  const dateOnly = new Date(parsedDate.toDateString());

  const existing = await StudyTrackingTime.findOne({ userId, date: dateOnly });

  if (existing) {
    existing.timeLearn = timeLearn;
    await existing.save();

    return res.status(200).json({
      code: 200,
      message: 'Cập nhật thời gian học thành công',
      data: { studyTrackingTime: existing },
    });
  }

  const newRecord = await StudyTrackingTime.create({ userId, timeLearn, date: dateOnly });

  res.status(201).json({
    code: 201,
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

  let records = await StudyTrackingTime.find({
    userId,
    date: { $gte: start, $lte: end },
  });

  const recordsMap = new Map(records.map((r) => [new Date(r.date).toDateString(), r.timeLearn]));

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayKey = today.toDateString();

  if (!recordsMap.has(todayKey)) {
    const newRecord = await StudyTrackingTime.create({
      userId,
      date: today,
      timeLearn: 0,
    });
    recordsMap.set(todayKey, newRecord.timeLearn);
  }

  const result = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    d.setHours(0, 0, 0, 0);

    const key = d.toDateString();
    const timeLearn = recordsMap.get(key) || 0;

    result.push({
      date: d.toLocaleDateString('vi-VN'),
      timeLearn,
      timeText: d.getTime() === today.getTime() ? 'Hôm nay' : d.toLocaleDateString('vi-VN'),
    });
  }

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy dữ liệu thời gian học 7 ngày gần nhất thành công',
    data: { records: result },
  });
});

module.exports = {
  createOrUpdateTodayStudyTime,
  getStudyTrackingTimesByUser,
};
