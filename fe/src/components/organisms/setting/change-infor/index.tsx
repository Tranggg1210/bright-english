import { useCallback, useEffect, useRef, useState } from "react";
import "../style.scss";

import { Formik, Form, Field } from "formik";
import Image from "next/image";
import AvatarDefault from "@public/images/avatar-default.jpg";
import { useAppDispatch, useAppSelector } from "@src/hooks/useHookReducers";
import { formatDateIn } from "@src/utils/format-time";
import { changeInforValidate } from "@src/types/validates";
import { changeInfor, updateUser } from "@src/services/users";
import useNotification from "@src/hooks/useNotification";
import ButtonComponent from "@src/components/atoms/button";

function ChangeInfor({ isOpen }: any) {
  const dispatch = useAppDispatch();
  const { notify } = useNotification();
  const [selectedFile, setSelectedFile] = useState("");
  const [linkAvaterSelect, setLinkAvatarSelect] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<any>(null);
  const { userInfor } = useAppSelector((state) => state.auth);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = useCallback((event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imgUrl = URL.createObjectURL(file);
      setSelectedFile(file);
      setLinkAvatarSelect(imgUrl);
    }
  }, []);

  useEffect(() => {
    setSelectedFile(userInfor?.avatar || "");
    setLinkAvatarSelect(userInfor?.avatar || "");
  }, [isOpen]);

  return (
    <div className="change-infor">
      <div className="change-infor__avatar">
        <div className="change-infor__avatar--img">
          <Image
            src={linkAvaterSelect || AvatarDefault}
            alt="avatar"
            width={250}
            height={250}
          />
        </div>
        <div className="change-infor__avatar--upload" onClick={handleIconClick}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_363_459670)">
              <rect x="16" y="12" width="32" height="32" rx="16" fill="white" />
              <g clipPath="url(#clip0_363_459670)">
                <path
                  opacity="0.4"
                  d="M31.9787 20.834H32.0206C32.4233 20.834 32.7567 20.834 33.032 20.8574C33.3205 20.882 33.5812 20.9344 33.8326 21.0589C34.2806 21.2807 34.5638 21.6332 34.7626 21.9867C34.9167 22.2607 35.0363 22.5685 35.1377 22.8294C35.1617 22.891 35.1846 22.95 35.2067 23.0052L35.3043 23.2492C35.353 23.3709 35.3773 23.4317 35.428 23.4661C35.4787 23.5005 35.5444 23.5006 35.6757 23.5008C36.2654 23.5017 36.7088 23.5085 37.0611 23.557C37.5166 23.6198 37.8459 23.7546 38.1882 24.0173C38.3616 24.1503 38.5167 24.3054 38.6497 24.4788C38.9343 24.8496 39.0548 25.282 39.1115 25.7848C39.1664 26.2711 39.1664 26.8809 39.1663 27.6372V30.7039C39.1664 31.6156 39.1664 32.3505 39.0887 32.9285C39.008 33.5286 38.8354 34.0338 38.4341 34.4351C38.0328 34.8364 37.5276 35.009 36.9275 35.0896C36.3495 35.1673 35.6147 35.1673 34.7029 35.1673H29.2964C28.3847 35.1673 27.6498 35.1673 27.0718 35.0896C26.4718 35.009 25.9665 34.8364 25.5652 34.4351C25.164 34.0338 24.9914 33.5286 24.9107 32.9285C24.833 32.3505 24.833 31.6156 24.833 30.7039V27.6372C24.833 26.8809 24.833 26.2711 24.8878 25.7848C24.9445 25.282 25.0651 24.8496 25.3496 24.4788C25.4826 24.3054 25.6378 24.1503 25.8111 24.0173C26.1534 23.7546 26.4828 23.6198 26.9382 23.557C27.2905 23.5085 27.7339 23.5017 28.3236 23.5008C28.455 23.5006 28.5207 23.5005 28.5714 23.4661C28.6221 23.4317 28.6464 23.3709 28.6951 23.2492L28.7927 23.0052C28.8148 22.95 28.8377 22.891 28.8616 22.8295C28.963 22.5685 29.0827 22.2607 29.2368 21.9867C29.4356 21.6332 29.7188 21.2807 30.1667 21.0589C30.4182 20.9344 30.6789 20.882 30.9674 20.8574C31.2426 20.834 31.576 20.834 31.9787 20.834Z"
                  fill="#009593"
                />
                <path
                  d="M29.333 29.3346C29.333 27.8619 30.5269 26.668 31.9997 26.668C33.4724 26.668 34.6663 27.8619 34.6663 29.3346C34.6663 30.8074 33.4724 32.0013 31.9997 32.0013C30.5269 32.0013 29.333 30.8074 29.333 29.3346Z"
                  fill="#009593"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M31.333 24.0007C31.333 23.6325 31.6302 23.334 31.9967 23.334C32.3619 23.334 32.6663 23.6339 32.6663 24.0007C32.6663 24.3688 32.3692 24.6673 32.0027 24.6673C31.6375 24.6673 31.333 24.3674 31.333 24.0007Z"
                  fill="#009593"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_363_459670"
                x="0"
                y="0"
                width="64"
                height="64"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="8" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_363_459670"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_363_459670"
                  result="shape"
                />
              </filter>
              <clipPath id="clip0_363_459670">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="translate(24 20)"
                />
              </clipPath>
            </defs>
          </svg>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/*"
          />
        </div>
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          email:  userInfor?.email || "",
          fullname: userInfor?.fullname || "",
          dob: formatDateIn(userInfor?.dob, "/") || "",
          avatar: userInfor?.avatar || "",
        }}
        validationSchema={changeInforValidate}
        onSubmit={async (values) => {
          try {
            setLoading(true);
            const newValue: any = {
              fullname: values.fullname,
            }

            if(values.dob){
              newValue.dob = values.dob;
            }

            if(selectedFile){
              newValue.avatar = selectedFile;
            }
            const res = await dispatch(changeInfor(newValue)).unwrap();

            if(res && res.data){
              dispatch(updateUser(res?.data?.user));
            }
            notify("success", "Cập nhập thông tin người dùng thành công!");
          } catch (error) {
            console.log(error);
            notify("error", "Cập nhập thông tin người dùng thất bại!");
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="change-infor__form">
            <div className="form-group">
              <div className="change-infor__form--group">
                <label htmlFor="fullname" className="change-infor__form--label">
                  Họ và tên
                </label>
                <div className="change-infor__form--container">
                  <Field
                    type="text"
                    name="fullname"
                    placeholder="Nhập thông tin"
                    className={`change-infor__form--input ${
                      errors.fullname && touched.fullname ? "input-error" : ""
                    }`}
                  ></Field>
                </div>
                <p className="change-infor__form--error">
                  {errors.fullname && touched.fullname && (
                    <>{errors.fullname}</>
                  )}
                </p>
              </div>
              <div className="change-infor__form--group">
                <label htmlFor="dob" className="change-infor__form--label">
                  Ngày sinh
                </label>
                <div className="change-infor__form--container">
                  <Field
                    type="date"
                    name="dob"
                    placeholder="Nhập thông tin"
                    className={`change-infor__form--input ${
                      errors.dob && touched.dob ? "input-error" : ""
                    }`}
                  ></Field>
                </div>
                <p className="change-infor__form--error">
                  {errors.dob && touched.dob && <>{errors.dob}</>}
                </p>
              </div>
            </div>
            <div className="change-infor__form--group">
              <label htmlFor="email" className="change-infor__form--label">
                Email
              </label>
              <div className="change-infor__form--container">
                <Field
                  type="text"
                  name="email"
                  placeholder="Nhập thông tin"
                  disabled
                  className="change-infor__form--input"
                ></Field>
              </div>
            </div>
            <div className="change-infor__form--action">
              <ButtonComponent
                className="change-infor__form--btn"
                type="submit"
                background=""
                borderRadius=""
                color=""
                fontSize=""
                onClick={() => {}}
                padding=""
                title="Lưu thông tin"
                isLoading={loading}
              ></ButtonComponent>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ChangeInfor;
