const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { cloudinary } = require('../configs/cloudinary.config');
const catchAsync = require('../utils/catchAsync');

const uploadAudio = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Chưa có file audio để upload');
  }

  try {
    const audioUpload = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
    });

    return res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: 'Upload audio thành công',
      url: audioUpload.secure_url,
    });
  } catch (error) {
    console.error(error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Lỗi upload audio');
  }
});

module.exports = {
  uploadAudio,
};
