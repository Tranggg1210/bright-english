const httpStatus = require('http-status');
const Grammar = require('../models/grammar.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createGrammar = catchAsync(async (req, res) => {
  const grammar = await Grammar.create(req.body);

  res.status(httpStatus.CREATED).json({
    code: httpStatus.CREATED,
    message: 'Tạo bài ngữ pháp thành công!',
    data: { grammar },
  });
});

const getGrammars = catchAsync(async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  const skip = (+page - 1) * +limit;

  const grammars = await Grammar.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(+limit);

  const totalResults = await Grammar.countDocuments();

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách bài ngữ pháp thành công!',
    data: {
      grammars,
      limit: +limit,
      currentPage: +page,
      totalPage: Math.ceil(totalResults / +limit),
      totalResults,
    },
  });
});

const getGrammarById = catchAsync(async (req, res) => {
  const grammar = await Grammar.findById(req.params.grammarId);
  if (!grammar) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy bài ngữ pháp!');
  }

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy thông tin bài ngữ pháp thành công!',
    data: { grammar },
  });
});

const updateGrammarById = catchAsync(async (req, res) => {
  const grammar = await Grammar.findById(req.params.grammarId);
  if (!grammar) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy bài ngữ pháp!');
  }

  Object.assign(grammar, req.body);
  await grammar.save();

  res.status(httpStatus.OK).json({
    message: 'Cập nhật bài ngữ pháp thành công!',
    code: httpStatus.OK,
    data: { grammar },
  });
});

const deleteGrammarById = catchAsync(async (req, res) => {
  const grammar = await Grammar.findById(req.params.grammarId);
  if (!grammar) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy bài ngữ pháp!');
  }

  await Grammar.findByIdAndDelete(req.params.grammarId);

  res.status(httpStatus.OK).json({
    message: 'Xoá bài ngữ pháp thành công!',
    code: httpStatus.OK,
    data: { grammar },
  });
});

module.exports = {
  createGrammar,
  getGrammars,
  getGrammarById,
  updateGrammarById,
  deleteGrammarById,
};
