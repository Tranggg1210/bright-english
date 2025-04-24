const joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: joi.object({
    fullname: joi.string().min(2).max(45).required().messages({
      'any.required': 'Vui lòng điền tên người dùng',
    }),
    email: joi.string().email().required().messages({
      'any.required': 'Vui lòng điền email',
    }),
    password: joi.string().when('googleId', {
      is: joi.exist(),
      then: joi.optional(),
      otherwise: joi.required().custom(password),
    }),
    googleId: joi.string().optional(),
    dob: joi.date().optional().messages({
      'date.base': 'Ngày sinh không hợp lệ',
    }),
  }),
};

const login = {
  body: joi.object({
    email: joi.string().email().required().messages({
      'any.required': 'Vui lòng điền email',
    }),
    password: joi.string().required().custom(password),
  }),
};

const refreshToken = {
  body: joi.object({
    refreshToken: joi.string().required().messages({
      'any.required': 'Vui lòng điền refresh token',
    }),
  }),
};

const changePassword = {
  body: joi.object({
    oldPassword: joi.string().required().custom(password),
    newPassword: joi.string().required().custom(password).not(joi.ref('oldPassword')).messages({
      'any.invalid': 'Mật khẩu mới không được trùng với mật khẩu cũ',
    }),
    repeatPassword: joi.string().min(6).max(30).required().valid(joi.ref('newPassword')).messages({
      'any.only': 'Mật khẩu nhập lại không khớp',
    }),
  }),
};

const changeUserProfile = {
  body: joi
    .object()
    .keys({
      fullname: joi.string().min(2).max(45).optional().messages({
        'string.base': 'Họ tên phải là một chuỗi',
        'string.min': 'Họ tên phải có ít nhất 2 ký tự',
        'string.max': 'Họ tên không được vượt quá 45 ký tự',
        'any.required': 'Vui lòng điền họ tên người dùng',
      }),
      avatar: joi.string().optional(),
      dob: joi.date().optional().messages({
        'date.base': 'Ngày sinh không hợp lệ',
      }),
    })
    .or('fullname', 'avatar', 'dob')
    .messages({
      'object.missing': 'Ít nhất một trong các trường fullname, dob hoặc avatar là bắt buộc',
    }),
};

const sendOtp = {
  body: joi.object().keys({
    email: joi.string().email().required().messages({
      'string.email': 'Email không hợp lệ',
      'string.empty': 'Email không được để trống',
      'any.required': 'Email là bắt buộc',
    }),
  }),
};

const verifyOtp = {
  body: joi.object().keys({
    email: joi.string().email().required().messages({
      'string.email': 'Email không hợp lệ',
      'string.empty': 'Email không được để trống',
      'any.required': 'Email là bắt buộc',
    }),
    otp: joi.string().length(6).required().messages({
      'string.length': 'Mã OTP phải có độ dài 6 ký tự',
      'string.empty': 'Mã OTP không được để trống',
      'any.required': 'Mã OTP là bắt buộc',
    }),
  }),
};

const resetPassword = {
  body: joi.object().keys({
    email: joi.string().email().required().messages({
      'string.email': 'Email không hợp lệ',
      'string.empty': 'Email không được để trống',
      'any.required': 'Email là bắt buộc',
    }),
    password: joi.string().min(6).required().messages({
      'string.min': 'Mật khẩu phải có ít nhất 6 ký tự',
      'string.empty': 'Mật khẩu không được để trống',
      'any.required': 'Mật khẩu là bắt buộc'
    })
  })
};

const googleLogin = {
  body: joi.object().keys({
    idToken: joi.string().required(),
  }),
};


module.exports = {
  register,
  login,
  changePassword,
  changeUserProfile,
  refreshToken,
  sendOtp,
  verifyOtp,
  resetPassword,
  googleLogin
};
