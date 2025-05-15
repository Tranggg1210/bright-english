"use client";

import "./style.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useNotification from "@src/hooks/useNotification";
import Loading from "@src/components/atoms/loading";
import { useAppDispatch } from "@src/hooks/useHookReducers";
import { getOTP, vetifyOTP } from "@src/services/auth";
import GetOTPForm from "@src/components/molecules/forgot-password/get-otp";
import VetifyOTP from "@src/components/molecules/forgot-password/vetify-otp";

export default function ForgotPassword() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { notify } = useNotification();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"get-otp" | "vetify-otp">("get-otp");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = async ({ email }: { email: string }) => {
    try {
      setLoading(true);
      await dispatch(getOTP({ email })).unwrap();
      setEmail(email);
      setTab("vetify-otp");
    } catch {
      notify("error", "Gửi mã xác nhận thất bại, vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  const handleVetifyOTP = async () => {
    try {
      setLoading(true);
      await dispatch(vetifyOTP({ email, otp })).unwrap();
      notify("success", "Xác thực mã otp thành công.");
      setTimeout(() => {
        router.push(`/create-password?e=${encodeURIComponent(email)}`);
      }, 2000)
    } catch (err) {
      console.log(err);
      notify("error", "Xác thực mã otp thất bại, vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  const handleBackPage = () => {
    if (tab === "get-otp") {
      router.push("/auth");
    } else {
      setTab("get-otp");
    }
  };

  return (
    <div className="forgot__password">
      <div className="forgot__password--title">
        <div onClick={handleBackPage}>
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
        <h4>{tab === "get-otp" ? "Quên mật khẩu" : "Xác thực mã OTP"}</h4>
        <div></div>
      </div>

      <div className="forgot__password__form">
        <p className="forgot__password__form--title">
          {tab === "get-otp"
            ? `Nhập email đăng ký web của bạn. Bạn sẽ nhận được một email có chứa mã xác minh để đặt mật khẩu mới.`
            : "Nhập mã otp mà chúng tôi đã gửi cho bạn để chúng tôi xác minh nhé."}
        </p>

        {tab === "get-otp" ? (
          <GetOTPForm handleSubmit={handleSubmit} />
        ) : (
          <VetifyOTP
            handleVetifyOTP={handleVetifyOTP}
            onExpired={() => setTab("get-otp")}
            otp={otp}
            setOtp={setOtp}
          />
        )}
      </div>

      {loading && <Loading />}
    </div>
  );
}
