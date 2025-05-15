"use client";
import "./style.scss";
import { useState } from "react";
import logo from "@public/images/logo.png";
import Image from "next/image";
import Login from "./login";
import Register from "./register";
import { useRouter } from "next/navigation";

function Auth() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const router = useRouter();
  return (
    <div className="auth">
      <div className="auth__header">
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
        <div className="auth__logo">
          <Image src={logo} alt="logo" width={120} />
        </div>
      </div>
      <div className="auth__navigation">
        <button
          className={`auth__navigation--btn ${
            isLoginPage ? "auth__navigation--active" : ""
          }`}
          onClick={() => setIsLoginPage(true)}
        >
          Đăng nhập
        </button>
        <button
          className={`auth__navigation--btn ${
            !isLoginPage ? "auth__navigation--active" : ""
          }`}
          onClick={() => setIsLoginPage(false)}
        >
          Đăng ký
        </button>
      </div>
      <div className="auth__form">
        {isLoginPage ? <Login /> : <Register setIsLoginPage={setIsLoginPage} />}
      </div>
    </div>
  );
}

export default Auth;
