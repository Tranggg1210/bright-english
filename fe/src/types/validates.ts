import * as Yup from 'yup'

export const loginValidate = () =>
  Yup.object({
    email: Yup.string().required('Vui lòng nhập email').email('Đây không phải định dạng của email'),
    password: Yup.string()
      .required('Vui lòng nhập mật khẩu')
      .min(8, 'Password phải lớn hơn 8 ký tự')
      .test('password-complexity', 'Mật khẩu phải chứa ít nhất 1 ký tự chữ hoa, 1 ký tự chữ thường và 1 số', (value) => 
        /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value)
      ),
  })

export const registerValidate = () =>
  Yup.object({
    fullname: Yup.string().required('Vui lòng nhập họ và tên'),
    email: Yup.string().required('Vui lòng nhập email').email('Đây không phải định dạng của email'),
    password: Yup.string()
      .required('Vui lòng nhập mật khẩu')
      .min(8, 'Password phải lớn hơn 8 ký tự')
      .test('password-complexity', 'Mật khẩu phải chứa ít nhất 1 ký tự chữ hoa, 1 ký tự chữ thường và 1 số', (value) => 
        /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value)
      ),
    password_confirm: Yup.string()
      .required('Vui lòng nhập lại mật khẩu')
      .oneOf([Yup.ref('password')], 'Mật khẩu không khớp'),
  })

export const forgotPasswordValidate = () =>
  Yup.object({
    email: Yup.string().required('Vui lòng nhập email').email('Đây không phải định dạng của email'),
  })

export const createPasswordValidate = () =>
  Yup.object({
    password: Yup.string()
      .required('Vui lòng nhập mật khẩu')
      .min(8, 'Password phải lớn hơn 8 ký tự')
      .test('password-complexity', 'Mật khẩu phải chứa ít nhất 1 ký tự chữ hoa, 1 ký tự chữ thường và 1 số', (value) => 
        /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value)
      ),
    repeatPassword: Yup.string()
      .required('Vui lòng nhập lại mật khẩu')
      .oneOf([Yup.ref('password')], 'Mật khẩu không khớp'),
  })

export const resetPasswordValidate = () =>
  Yup.object({
    password: Yup.string()
      .required('Vui lòng nhập mật khẩu mới')
      .min(8, 'Password phải lớn hơn 8 ký tự')
      .test('password-complexity', 'Mật khẩu phải chứa ít nhất 1 ký tự chữ hoa, 1 ký tự chữ thường và 1 số', (value) => 
        /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value)
      ),
    repeatPassword: Yup.string()
      .required('Vui lòng nhập lại mật khẩu mới')
      .oneOf([Yup.ref('password')], 'Mật khẩu không khớp'),
  })

export const changeInforValidate = () =>
  Yup.object({
    fullname: Yup.string().required('Vui lòng nhập họ và tên'),
    dob: Yup.date()
      .required('Vui lòng chọn ngày sinh')
      .max(new Date(), 'Ngày sinh không được lớn hơn hôm nay'),
  })
