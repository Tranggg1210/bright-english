const httpStatus = require('http-status');
const Contact = require('../models/contact.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createContact = catchAsync(async (req, res) => {
  const contact = await Contact.create(req.body);

  res.status(httpStatus.CREATED).json({
    code: httpStatus.CREATED,
    message: 'Tạo liên hệ thành công!',
    data: { contact },
  });
});

const getContacts = catchAsync(async (req, res) => {
  const { limit = 10, page = 1, sortBy = 'createdAt:desc' } = req.query;

  const skip = (page - 1) * limit;

  const sort = {};
  sortBy.split(',').forEach((sortOption) => {
    const [key, order] = sortOption.split(':');
    sort[key.trim()] = order?.trim() === 'asc' ? 1 : -1;
  });

  const contacts = await Contact.find()
    .limit(+limit)
    .skip(skip)
    .sort(sort);

  const totalResults = await Contact.countDocuments();

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách liên hệ thành công!',
    data: {
      contacts,
      limit: +limit,
      currentPage: +page,
      totalPage: Math.ceil(totalResults / +limit),
      totalResults,
    },
  });
});

const getContactById = catchAsync(async (req, res) => {
  const contact = await Contact.findById(req.params.contactId);
  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy liên hệ!');
  }

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy thông tin liên hệ thành công!',
    data: { contact },
  });
});

const updateContactById = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy liên hệ!');
  }

  Object.assign(contact, req.body); 
  await contact.save();

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Cập nhật liên hệ thành công!',
    data: { contact },
  });
});

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContactById,
};
