const httpStatus = require('http-status');
const Report = require('../models/report.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createReport = catchAsync(async (req, res) => {
  const { userId, title, message } = req.body;

  const report = await Report.create({ userId, title, message });

  res.status(httpStatus.CREATED).json({
    code: httpStatus.CREATED,
    message: 'Tạo báo cáo thành công!',
    data: { report },
  });
});

const getReports = catchAsync(async (req, res) => {
  const { limit = 10, page = 1, sortBy = 'createdAt:desc' } = req.query;

  const skip = (+page - 1) * +limit;

  const sort = {};
  sortBy.split(',').forEach((sortOption) => {
    const [key, order] = sortOption.split(':');
    sort[key.trim()] = order?.trim() === 'asc' ? 1 : -1;
  });

  const reports = await Report.find().limit(+limit).skip(skip).sort(sort).populate('userId', 'fullname email');

  const flattenReports = reports.map((report) => ({
    ...report.toObject(),
    fullname: report.userId.fullname,
    email: report.userId.email,
    userId: report.userId._id,
  }));

  const totalResults = await Report.countDocuments();

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách báo cáo thành công!',
    data: {
      reports: flattenReports,
      limit: +limit,
      currentPage: +page,
      totalPage: Math.ceil(totalResults / +limit),
      totalResults,
    },
  });
});

const getReportById = catchAsync(async (req, res) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy báo cáo!');
  }

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy thông tin báo cáo thành công!',
    data: { report },
  });
});

const updateReportById = catchAsync(async (req, res) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy báo cáo!');
  }

  Object.assign(report, req.body);

  await report.save();

  res.status(httpStatus.OK).json({
    message: 'Cập nhật báo cáo thành công!',
    code: httpStatus.OK,
    data: { report },
  });
});

module.exports = {
  createReport,
  getReports,
  getReportById,
  updateReportById,
};
