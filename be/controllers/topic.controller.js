const httpStatus = require('http-status');
const Topic = require('../models/topic.model');
const Vocabulary = require('../models/vocabulary.model');
const Conversation = require('../models/conversation.model');
const Log = require('../models/log.model');
const Exercise = require('../models/exercise.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createTopic = catchAsync(async (req, res) => {
  const topicName = await Topic.findOne({ name: req.body.name });
  if (topicName) {
    throw new ApiError(httpStatus.CONFLICT, 'Tên chủ đề đã tồn tại');
  }

  const topic = await Topic.create(req.body);

  res.status(httpStatus.CREATED).json({
    code: httpStatus.CREATED,
    message: 'Tạo chủ đề thành công!',
    data: { topic },
  });
});

const getTopics = catchAsync(async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  const skip = (+page - 1) * +limit;

  const topicsAggregate = await Topic.aggregate([
    {
      $addFields: {
        topicNumber: {
          $toInt: {
            $getField: {
              input: {
                $regexFind: {
                  input: "$name",
                  regex: /(?<=TOPIC\s)\d+/
                }
              },
              field: "match"
            }
          }
        }
      }
    },
    { $sort: { topicNumber: 1 } },
    { $skip: skip },
    { $limit: +limit },
    {
      $project: {
        _id: 1,
        name: 1
      }
    }
  ]);

  const totalResults = await Topic.countDocuments();

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách topic thành công!',
    data: {
      topics: topicsAggregate,
      limit: +limit,
      currentPage: +page,
      totalPage: Math.ceil(totalResults / +limit),
      totalResults,
    },
  });
});


const getTopicById = catchAsync(async (req, res) => {
  const topic = await Topic.findById(req.params.topicId);
  if (!topic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy chủ đề!');
  }

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy thông tin chủ đề thành công!',
    data: { topic },
  });
});

const updateTopicById = catchAsync(async (req, res) => {
  const topic = await Topic.findById(req.params.topicId);
  if (!topic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy chủ đề!');
  }

  Object.assign(topic, req.body);

  await topic.save();

  res.status(httpStatus.OK).json({
    message: 'Cập nhật thông tin chủ đề thành công',
    code: httpStatus.OK,
    data: { topic },
  });
});

// const deleteTopicById = catchAsync(async (req, res) => {
//   const topic = await Topic.findByIdAndDelete(req.params.topicId);
//   if (!topic) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy chủ đề!');
//   }

//   res.status(httpStatus.OK).json({
//     message: 'Xoá chủ đề thành công!',
//     code: httpStatus.OK,
//     data: { topic },
//   });
// });

const deleteTopicById = catchAsync(async (req, res) => {
  const { topicId } = req.params;

  const topic = await Topic.findById(topicId);
  if (!topic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy chủ đề!');
  }

  await Vocabulary.deleteMany({ topicId });

  await Conversation.deleteMany({ topicId });

  const exercises = await Exercise.find({ topicId });
  const exerciseIds = exercises.map((ex) => ex._id);

  await Log.deleteMany({ exerciseId: { $in: exerciseIds } });

  await Exercise.deleteMany({ topicId });

  // Xoá topic
  await Topic.findByIdAndDelete(topicId);

  res.status(httpStatus.OK).json({
    message: 'Xoá chủ đề và toàn bộ dữ liệu liên quan thành công!',
    code: httpStatus.OK,
    data: { topic },
  });
});

module.exports = {
  createTopic,
  getTopics,
  getTopicById,
  updateTopicById,
  deleteTopicById,
};
