import "./style.scss";
import { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { registerValidate } from "@src/types/validates";
import { useAppDispatch } from "@src/hooks/useHookReducers";
import { postRegister } from "@src/services/auth";
import useNotification from "@src/hooks/useNotification";
import ButtonComponent from "@src/components/atoms/button";

interface RegisterProps {
  setIsLoginPage: (isLogin: boolean) => void;
}

interface RegisterFormValues {
  fullname: string;
  email: string;
  password: string;
  password_confirm: string;
}

function Register({ setIsLoginPage }: RegisterProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { notify } = useNotification();
  const dispatch = useAppDispatch();

  const initialValues: RegisterFormValues = {
    fullname: "",
    email: "",
    password: "",
    password_confirm: "",
  };

  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      setLoading(true);
      const handleValue = {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
      };
      await dispatch(postRegister(handleValue)).unwrap();

      notify("success", "Đăng ký thành công!");

      setIsLoginPage(true);
    } catch (error: any) {
      notify("error", error?.message);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <Formik
        initialValues={initialValues}
        validationSchema={registerValidate}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="register__form">
            {/* Họ và tên */}
            <div className="register__form--group">
              <label htmlFor="fullname" className="register__form--label">
                Họ và tên
              </label>
              <div className="register__form--container">
                <Field
                  type="text"
                  name="fullname"
                  placeholder="Nhập họ và tên"
                  className={`register__form--input ${
                    errors.fullname && touched.fullname ? "input-error" : ""
                  }`}
                />
              </div>
              <p className="register__form--error">
                {errors.fullname && touched.fullname && <>{errors.fullname}</>}
              </p>
            </div>

            {/* Email */}
            <div className="register__form--group">
              <label htmlFor="email" className="register__form--label">
                Email
              </label>
              <div className="register__form--container">
                <Field
                  type="text"
                  name="email"
                  placeholder="Nhập email của bạn"
                  className={`register__form--input ${
                    errors.email && touched.email ? "input-error" : ""
                  }`}
                />
              </div>
              <p className="register__form--error">
                {errors.email && touched.email && <>{errors.email}</>}
              </p>
            </div>

            {/* Mật khẩu */}
            <div className="register__form--group">
              <label htmlFor="password" className="register__form--label">
                Nhập mật khẩu
              </label>
              <div className="register__form--container">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Nhập mật khẩu của bạn"
                  className={`register__form--input ${
                    errors.password && touched.password ? "input-error" : ""
                  }`}
                />
                <div
                  className="register__form--icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {/* icon show/hide */}
                  {showPassword ? eyeIcon() : eyeOffIcon()}
                </div>
              </div>
              <p className="register__form--error">
                {errors.password && touched.password && <>{errors.password}</>}
              </p>
            </div>

            {/* Nhập lại mật khẩu */}
            <div className="register__form--group">
              <label
                htmlFor="password_confirm"
                className="register__form--label"
              >
                Nhập lại mật khẩu
              </label>
              <div className="register__form--container">
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  name="password_confirm"
                  placeholder="Nhập mật khẩu của bạn"
                  className={`register__form--input ${
                    errors.password_confirm && touched.password_confirm
                      ? "input-error"
                      : ""
                  }`}
                />
                <div
                  className="register__form--icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {/* icon show/hide */}
                  {showConfirmPassword ? eyeIcon() : eyeOffIcon()}
                </div>
              </div>
              <p className="register__form--error">
                {errors.password_confirm && touched.password_confirm && (
                  <>{errors.password_confirm}</>
                )}
              </p>
            </div>

            <ButtonComponent
              background="#ff8400"
              borderRadius="48px"
              color="#fff"
              fontSize="14px"
              onClick={() => {}}
              padding="14px 16px"
              title="ĐĂNG KÝ"
              type="submit"
              isLoading={loading}
              width="100%"
              className="!mt-7 cursor-pointer"
              fontWeight={600}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

const eyeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.1303 9.8531C22.2899 11.0732 22.2899 12.9268 21.1303 14.1469C19.1745 16.2047 15.8155 19 12 19C8.18448 19 4.82549 16.2047 2.86971 14.1469C1.7101 12.9268 1.7101 11.0732 2.86971 9.8531C4.82549 7.79533 8.18448 5 12 5C15.8155 5 19.1745 7.79533 21.1303 9.8531Z"
      stroke="#8B90A7"
      strokeWidth="1.5"
    />
    <path
      d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
      stroke="#8B90A7"
      strokeWidth="1.5"
    />
  </svg>
);

const eyeOffIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 4L20 20M14 14.2361C13.4692 14.7111 12.7684 15 12 15C10.3431 15 9 13.6569 9 12C9 11.2316 9.28885 10.5308 9.76389 10M19.6078 15.6077C20.1791 15.1103 20.6902 14.6099 21.1303 14.1469C22.2899 12.9268 22.2899 11.0732 21.1303 9.8531C19.1745 7.79533 15.8155 5 12 5C11.1086 5 10.2422 5.15256 9.4127 5.41264M6.5 6.80338C5.04144 7.73444 3.79764 8.87678 2.86971 9.8531C1.7101 11.0732 1.7101 12.9268 2.86971 14.1469C4.82549 16.2047 8.18448 19 12 19C13.8681 19 15.6267 18.3299 17.1648 17.4044"
      stroke="#8B90A7"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default Register;
