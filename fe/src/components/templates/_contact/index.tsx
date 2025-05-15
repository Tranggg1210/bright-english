"use client";

import "./style.scss";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ButtonComponent from "@src/components/atoms/button";
import { useAppDispatch } from "@src/hooks/useHookReducers";
import useNotification from "@src/hooks/useNotification";
import { postContact } from "@src/services/contact";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ContactSchema = Yup.object().shape({
  fullName: Yup.string().required("Vui lòng nhập họ tên"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  phone: Yup.string().required("Vui lòng nhập số điện thoại"),
  message: Yup.string()
    .required("Vui lòng nhập tin nhắn")
    .max(400, "Tin nhắn tối đa 400 ký tự"),
});

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const { notify } = useNotification();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="contact-container">
      <div className="contact-container__header">
        <div onClick={() => router.push("/")} className="icon-back">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
        <h1 className="contact-title">Liên hệ với chúng tôi 😄</h1>
      </div>
      <p className="contact-description">
        Nếu bạn có thắc mắc gì hãy liên hệ với chúng tôi ngay để đượ giải đáp
        bạn dấu yêu nhé ^^
      </p>

      <Formik
        initialValues={{ fullName: "", email: "", phone: "", message: "" }}
        validationSchema={ContactSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            setLoading(true);
            await dispatch(postContact(values));
            notify(
              "success",
              "Gửi liên hệ của bạn tới chúng tôi thành công ^^"
            );
            resetForm();
          } catch (error) {
            console.log(error);
            notify(
              "error",
              "Lỗi không thể gửi liên hệ của bạn. Vui lòng thử lại sau!"
            );
          } finally {
            setLoading(false);
          }
        }}
      >
        {() => (
          <Form className="contact-form">
            <div className="contact-form-wapper">
              <div className="contact-form-group">
                <label htmlFor="fullName">Họ tên</label>
                <Field type="text" name="fullName" />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="contact-error"
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="phone">Số điện thoại</label>
                <Field type="text" name="phone" />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="contact-error"
                />
              </div>
            </div>

            <div className="contact-form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="contact-error"
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="message">Tin nhắn</label>
              <Field as="textarea" name="message" rows={5} />
              <ErrorMessage
                name="message"
                component="div"
                className="contact-error"
              />
            </div>

            <ButtonComponent
              background="#ff8400"
              borderRadius="48px"
              color="#fff"
              fontSize="16px"
              onClick={() => {}}
              padding="12px 14px"
              title="Gửi liên hệ"
              type="submit"
              isLoading={loading}
              className="cursor-pointer"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
