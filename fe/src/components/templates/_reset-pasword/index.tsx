"use client";

import "./style.scss";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createPasswordValidate } from "@src/types/validates";
import { useAppDispatch } from "@src/hooks/useHookReducers";
import { resetPassword } from "@src/services/auth";
import Loading from "@src/components/atoms/loading";
import useNotification from "@src/hooks/useNotification";

interface FormValues {
  password: string;
  repeatPassword: string;
}

export default function CreatePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { notify } = useNotification();

  const router = useRouter();

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      console.log(values);
      const email = decodeURIComponent(searchParams.get("e") || "");
      await dispatch(
        resetPassword({
          email,
          password: values.password,
        })
      );

      notify("success", "Thay đổi mật khẩu của tài khoản thành công.");
      setTimeout(() => {
        router.push("/auth");
      }, 2000);
    } catch (error: any) {
      console.log(error);
      notify(
        "error",
        "Lỗi không thể đổi mật khẩu của tài khoản. Vui lòng thử lại sau!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot__password">
      {loading && <Loading />}

      <div className="forgot__password--title" style={{ marginBottom: "32px" }}>
        <div onClick={() => router.push("/forgot-password")}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="16" fill="#C4C4CF" />
            <path
              d="M18 12L14.7071 15.2929C14.3738 15.6262 14.2071 15.7929 14.2071 16C14.2071 16.2071 14.3738 16.3738 14.7071 16.7071L18 20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h4>Quên mật khẩu</h4>
        <div />
      </div>

      <Formik
        initialValues={{
          password: "",
          repeatPassword: "",
        }}
        validationSchema={createPasswordValidate}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="forgot__password__form">
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
                  <div className="cursor-pointer">{showPassword ? "👁️" : "🙈"}</div>
                </div>
              </div>
              {errors.password && touched.password && (
                <p className="register__form--error">{errors.password}</p>
              )}
            </div>

            {/* Nhập lại mật khẩu */}
            <div className="register__form--group">
              <label htmlFor="repeatPassword" className="register__form--label">
                Nhập lại mật khẩu
              </label>
              <div className="register__form--container">
                <Field
                  type={showRepeatPassword ? "text" : "password"}
                  name="repeatPassword"
                  placeholder="Nhập lại mật khẩu"
                  className={`register__form--input ${
                    errors.repeatPassword && touched.repeatPassword
                      ? "input-error"
                      : ""
                  }`}
                />
                <div
                  className="register__form--icon"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                  <div className="cursor-pointer">{showRepeatPassword ? "👁️" : "🙈"}</div>
                </div>
              </div>
              {errors.repeatPassword && touched.repeatPassword && (
                <p className="register__form--error">{errors.repeatPassword}</p>
              )}
            </div>

            <button type="submit" className="forgot__password__form--btn">
              Xác nhận
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
