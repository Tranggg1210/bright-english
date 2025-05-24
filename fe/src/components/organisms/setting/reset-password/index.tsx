import '../style.scss'
import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import PropTypes from 'prop-types'
import useNotification from '@src/hooks/useNotification'
import { changePasswordValidate } from '@src/types/validates'
import { changePassword } from '@src/services/users'
import { useAppDispatch } from '@src/hooks/useHookReducers'

function ResetPassword({ setShowDialog, setShowSetting }: {setShowDialog: React.Dispatch<React.SetStateAction<any>>;  setShowSetting: (value: boolean) => void;}) {
  const {notify} = useNotification();
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
        repeatPassword: '',
      }}
      validationSchema={changePasswordValidate}
      onSubmit={async (values) => {
        try {
          await dispatch(changePassword(values)).unwrap();
          setTimeout(() => {
            setShowSetting(false);
            setShowDialog(true);
          }, 600)
        } catch (error: any) {
          // console.log(error)
          notify("error", error?.message || "Thay đổi mật khẩu thất bại. Vui lòng thử lại sau!");
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className='reset-password__form'>
          <div className='reset-password__form--group'>
            <label htmlFor='oldPassword' className='reset-password__form--label'>
              Mật khẩu cũ
            </label>
            <div className='reset-password__form--container'>
              <Field
                type={showOldPassword ? 'text' : 'password'}
                name='oldPassword'
                placeholder='Nhập thông tin'
                className={`reset-password__form--input ${
                  errors.oldPassword && touched.oldPassword ? 'input-error' : ''
                }`}
              />
              <div
                className='reset-password__form--icon'
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? eyeIcon() : eyeSlashIcon()}
              </div>
            </div>
            <p className='reset-password__form--error'>
              {errors.oldPassword && touched.oldPassword && <>{errors.oldPassword}</>}
            </p>
          </div>

          <div className='reset-password__form--group'>
            <label htmlFor='newPassword' className='reset-password__form--label'>
              Nhập mật khẩu mới
            </label>
            <div className='reset-password__form--container'>
              <Field
                type={showPassword ? 'text' : 'password'}
                name='newPassword'
                placeholder='Nhập thông tin'
                className={`reset-password__form--input ${
                  errors.newPassword && touched.newPassword ? 'input-error' : ''
                }`}
              />
              <div
                className='reset-password__form--icon'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? eyeIcon() : eyeSlashIcon()}
              </div>
            </div>
            <p className='reset-password__form--error'>
              {errors.newPassword && touched.newPassword && <>{errors.newPassword}</>}
            </p>
          </div>

          <div className='reset-password__form--group'>
            <label htmlFor='repeatPassword' className='reset-password__form--label'>
              Nhập lại mật khẩu mới
            </label>
            <div className='reset-password__form--container'>
              <Field
                type={showRepeatPassword ? 'text' : 'password'}
                name='repeatPassword'
                placeholder='Nhập thông tin'
                className={`reset-password__form--input ${
                  errors.repeatPassword && touched.repeatPassword ? 'input-error' : ''
                }`}
              />
              <div
                className='reset-password__form--icon'
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              >
                {showRepeatPassword ? eyeIcon() : eyeSlashIcon()}
              </div>
            </div>
            <p className='reset-password__form--error'>
              {errors.repeatPassword && touched.repeatPassword && <>{errors.repeatPassword}</>}
            </p>
          </div>

          <button className='reset-password__form--btn' type='submit'>
            ĐỔI MẬT KHẨU
          </button>
        </Form>
      )}
    </Formik>
  )
}

const eyeIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
    <path d='M21.13 9.85C22.29 11.07 22.29 12.93 21.13 14.15C19.17 16.2 15.82 19 12 19C8.18 19 4.83 16.2 2.87 14.15C1.71 12.93 1.71 11.07 2.87 9.85C4.83 7.8 8.18 5 12 5C15.82 5 19.17 7.8 21.13 9.85Z' stroke='#8B90A7' strokeWidth='1.5'/>
    <path d='M15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12Z' stroke='#8B90A7' strokeWidth='1.5'/>
  </svg>
)

const eyeSlashIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
    <path d='M4 4L20 20M14 14.24C13.47 14.71 12.77 15 12 15C10.34 15 9 13.66 9 12C9 11.23 9.29 10.53 9.76 10M19.61 15.61C20.18 15.11 20.69 14.61 21.13 14.15C22.29 12.93 22.29 11.07 21.13 9.85C19.17 7.8 15.82 5 12 5C11.11 5 10.24 5.15 9.41 5.41M6.5 6.8C5.04 7.73 3.8 8.88 2.87 9.85C1.71 11.07 1.71 12.93 2.87 14.15C4.83 16.2 8.18 19 12 19C13.87 19 15.63 18.33 17.16 17.4' stroke='#8B90A7' strokeWidth='1.5' strokeLinecap='round'/>
  </svg>
)

ResetPassword.propTypes = {
  setShowDialog: PropTypes.func,
}

export default ResetPassword
