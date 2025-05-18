"use client";

import { Formik, Form, Field } from "formik";
import { forgotPasswordValidate } from "@src/types/validates";

interface Props {
  handleSubmit: (values: { email: string }) => void;
}

export default function GetOTPForm({ handleSubmit }: Props) {
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={forgotPasswordValidate}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="forgot__password__form">
          <div className="forgot__password__form--group">
            <label htmlFor="email" className="forgot__password__form--label">
              Nhập email
            </label>
            <div className="forgot__password__form--container">
              <Field
                type="text"
                name="email"
                placeholder="Nhập thông tin"
                className={`forgot__password__form--input ${
                  errors.email && touched.email ? "input-error" : ""
                }`}
              />
            </div>
            {errors.email && touched.email && (
              <p className="forgot__password__form--error">
                {errors.email}
              </p>
            )}
          </div>

          <button className="forgot__password__form--btn" type="submit">
            NHẬN MÃ
          </button>
        </Form>
      )}
    </Formik>
  );
}
