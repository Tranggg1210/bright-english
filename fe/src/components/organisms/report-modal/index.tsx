"use client";
import ModalComponent from "@src/components/atoms/modal";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@src/hooks/useHookReducers";
import useNotification from "@src/hooks/useNotification";
import { createReport } from "@src/services/report";
import ButtonComponent from "@src/components/atoms/button";

function ReportModal() {
  const [isShow, setIsShow] = useState(false);
  const { userInfor } = useAppSelector((state) => state.auth);
  const { notify } = useNotification();
  const dispatch = useAppDispatch();

  const initialValues = {
    reason: "",
    description: "",
  };

  const validationSchema = Yup.object({
    reason: Yup.string().required("⚠️ Vui lòng chọn lý do báo cáo."),
    description: Yup.string()
      .trim()
      .required("⚠️ Vui lòng nhập nội dung chi tiết.")
      .max(500, "⚠️ Vui lòng nhập nội dung chi tiết."),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const reportData = {
        userId: userInfor?._id,
        title: values.reason,
        message: values.description,
      };

      await dispatch(createReport(reportData)).unwrap();

      notify("success", "Gửi bài báo cáo thành công!");

      setIsShow(false);
    } catch (error) {
      notify(
        "error",
        "Lỗi không thể gửi bài báo cáo của bạn. Vui lòng thử lại sau!"
      );
    }
  };

  return (
    <>
      <div
        className="btn btn-danger"
        style={{
          backgroundColor: "rgb(255 248 230)",
          border: "none",
          width: "40px",
          height: "40px",
          borderRadius: "8px",
          padding: "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => setIsShow(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#ffc535"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
      </div>

      <ModalComponent
        setIsShow={setIsShow}
        isShow={isShow}
        titleModal="Báo cáo"
        classNameContentContainer="!p-6"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="form-check mb-2">
                <Field
                  type="radio"
                  name="reason"
                  value="Nội dung sai"
                  className="form-check-input"
                  id="reason1"
                />
                <label className="form-check-label" htmlFor="reason1">
                  Nội dung sai
                </label>
              </div>

              <div className="form-check mb-3">
                <Field
                  type="radio"
                  name="reason"
                  value="Lý do khác"
                  className="form-check-input"
                  id="reason2"
                />
                <label className="form-check-label" htmlFor="reason2">
                  Lý do khác
                </label>
              </div>

              <ErrorMessage
                name="reason"
                component="div"
                className="text-red-600 text-sm font-semibold mb-2"
              />

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Chi tiết:
                </label>
                <Field
                  as="textarea"
                  name="description"
                  className="form-control"
                  id="description"
                  rows={5}
                  placeholder="Nhập nội dung chi tiết..."
                />
              </div>

              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600 text-sm font-semibold mb-2 -mt-1"
              />

              <div className="flex justify-center items-center gap-4 mt-4">
                <ButtonComponent
                  background="#ebebf0"
                  borderRadius="48px"
                  color="rgb(193 193 193)"
                  fontSize="14px"
                  onClick={() => setIsShow(false)}
                  padding="12px 16px"
                  title="Hủy"
                  type="button"
                  width="50%"
                />
                <ButtonComponent
                  background="rgb(254, 192, 72)"
                  borderRadius="48px"
                  color="#fff"
                  fontSize="14px"
                  onClick={() => {}}
                  padding="12px 16px"
                  title="Gửi"
                  type="submit"
                  width="50%"
                />
              </div>
            </Form>
          )}
        </Formik>
      </ModalComponent>
    </>
  );
}

export default ReportModal;
