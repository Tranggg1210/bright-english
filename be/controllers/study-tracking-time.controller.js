const httpStatus = require('http-status');
const StudyTrackingTime = require('../models/study_tracking_time.model');
const catchAsync = require('../utils/catchAsync');

const createOrUpdateTodayStudyTime = catchAsync(async (req, res) => {
  const { timeLearn } = req.body;
  const userId = req.user.id;

  if (typeof timeLearn !== 'number' || timeLearn < 0) {
    return res.status(400).json({
      code: 400,
      message: 'Thời gian học không hợp lệ',
    });
  }

  const now = new Date();
  // Tạo ngày chỉ có phần ngày, theo UTC 0h0p0s
  const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  let record = await StudyTrackingTime.findOne({ userId, date: todayUTC });

  if (record) {
    record.timeLearn = timeLearn;
    await record.save();
  } else {
    record = await StudyTrackingTime.create({
      userId,
      timeLearn,
      date: todayUTC,
    });
  }

  res.status(record.createdAt.getTime() === record.updatedAt.getTime() ? 201 : 200).json({
    code: record.createdAt.getTime() === record.updatedAt.getTime() ? 201 : 200,
    message: record.createdAt.getTime() === record.updatedAt.getTime()
      ? 'Tạo bản ghi thời gian học thành công'
      : 'Cập nhật thời gian học thành công',
    data: {
      studyTrackingTime: {
        ...record.toObject(),
        date: todayUTC.toISOString().split('T')[0], 
      },
    },
  });
});


const getStudyTrackingTimesByUser = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const now = new Date();

  const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  const startDateUTC = new Date(todayUTC);
  startDateUTC.setUTCDate(startDateUTC.getUTCDate() - 6);

  let records = await StudyTrackingTime.find({
    userId,
    date: { $gte: startDateUTC, $lte: todayUTC },
  }).sort({ date: 1 });

  const hasToday = records.some(r => r.date.getTime() === todayUTC.getTime());
  if (!hasToday) {
    const newRecord = await StudyTrackingTime.create({
      userId,
      date: todayUTC,
      timeLearn: 0,
    });
    records.push(newRecord);
  }

  const recordsMap = new Map(records.map(r => [r.date.getTime(), r.timeLearn]));

  const result = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(todayUTC);
    d.setUTCDate(d.getUTCDate() - i);
    d.setUTCHours(0, 0, 0, 0);

    result.push({
      date: d.toLocaleDateString('vi-VN'),
      timeLearn: recordsMap.get(d.getTime()) || 0,
      timeText: d.getTime() === todayUTC.getTime() ? 'Hôm nay' : d.toLocaleDateString('vi-VN'),
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
