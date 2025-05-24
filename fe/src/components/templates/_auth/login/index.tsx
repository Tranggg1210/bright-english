import "./style.scss";
import { FC, useState } from "react";
import { Formik, Form, Field } from "formik";
import { loginValidate } from "@src/types/validates";
import { GoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "@src/hooks/useHookReducers";
import { postLogin, updateUserInfor } from "@src/services/auth";
import { useRouter } from "next/navigation";
import ButtonComponent from "@src/components/atoms/button";
import useNotification from "@src/hooks/useNotification";
import Link from "next/link";
import apiConstant from "@src/constants/api.constant";
import LocalStorage from "@src/helpers/local-storage";
import CookieStorage from "@src/helpers/cookies";

interface LoginValues {
  email: string;
  password: string;
}

const Login: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLoginGGSuccess = (response: any) => {
    const { credential } = response;

    fetch(
      `${process.env.NEXT_PUBLIC_APP_API_URL}${apiConstant.auth.loginWithGG}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken: credential }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.user?.isLocked) {
          notify(
            "error",
            "Tài khoản đã bị khóa vui lòng liện hệ với dùng tôi, hoặc đăng nhập tài khoản khác!"
          );
          return;
        }

        LocalStorage.setLocalStorage("access-token", data.data.accessToken);
        CookieStorage.setCookie("refresh-token", data.data.refreshToken);
        router.push("/app");
      })
      .catch(() => {
        notify(
          "error",
          "Không thể đăng nhập với tài khoản google, vui lòng thử lại sau!"
        );
      });
  };

  const handleSubmit = async (values: LoginValues) => {
    try {
      setLoading(true);
      const result = await dispatch(
        postLogin({
          email: values.email,
          password: values.password,
        })
      ).unwrap();

      if (result?.user?.isLocked) {
        notify(
          "error",
          "Tài khoản đã bị khóa vui lòng liện hệ với dùng tôi, hoặc đăng nhập tài khoản khác!"
        );
        return;
      }

      if(result?.user){
        await dispatch(updateUserInfor(result.user))
      }

      LocalStorage.setLocalStorage("access-token", result.accessToken);
      CookieStorage.setCookie("refresh-token", result.refreshToken);
      router.push("/app");
    } catch (error: any) {
      notify(
        "error",
        error?.message || "Không thể đăng nhập, vui lòng thử lại sau!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLoginError = () => {
    notify(
      "error",
      "Không thể đăng nhập với tài khoản google, vui lòng thử lại sau!"
    );
  };

  return (
    <div className="login">
      <div className="login__app">
        <GoogleLogin
          onSuccess={handleLoginGGSuccess}
          onError={handleLoginError}
          containerProps={{
            style: { width: "100%" },
          }}
        />
      </div>

      <div className="login__separator">
        <hr />
        <p>Hoặc</p>
        <hr />
      </div>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginValidate}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, touched }) => (
          <Form className="login__form">
            <div className="login__form--group">
              <label htmlFor="email" className="login__form--label">
                Nhập email
              </label>
              <div className="login__form--container">
                <Field
                  type="text"
                  name="email"
                  placeholder="Nhập email của bạn"
                  className={`login__form--input ${
                    errors.email && touched.email ? "input-error" : ""
                  }`}
                ></Field>
              </div>
              <p className="login__form--error">
                {errors.email && touched.email && <>{errors.email}</>}
              </p>
            </div>
            <div className="login__form--group">
              <label htmlFor="password" className="login__form--label">
                Nhập mật khẩu
              </label>
              <div className="login__form--container">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Nhập mật khẩu của bạn"
                  className={`login__form--input ${
                    errors.password && touched.password ? "input-error" : ""
                  }`}
                ></Field>
                <div
                  className="login__form--icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
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
                  ) : (
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
                  )}
                </div>
              </div>
              <p className="login__form--error">
                {errors.password && touched.password && <>{errors.password}</>}
              </p>
            </div>
            <p className="login__form--nav">
              <Link href={"/forgot-password"}>Quên mật khẩu</Link>
            </p>
            <ButtonComponent
              background="#ff8400"
              borderRadius="48px"
              color="#fff"
              fontSize="14px"
              onClick={() => {}}
              padding="14px 16px"
              title="ĐĂNG NHẬP"
              type="submit"
              fontWeight={600}
              isLoading={loading}
              width="100%"
              className="cursor-pointer"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
