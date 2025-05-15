"use client";

import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";

interface Props {
  handleVetifyOTP: () => void;
  onExpired: () => void;
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
}

export default function VetifyOTP({
  handleVetifyOTP,
  otp,
  setOtp,
  onExpired,
}: Props) {
  const [countdown, setCountdown] = useState(180);

  const handleChange = (value: string) => {
    setOtp(value);
  };

  // Đếm ngược
  useEffect(() => {
    if (countdown <= 0) {
      onExpired();
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, onExpired]);

  return (
    <div className="forgot__password__form vetify-otp">
      <p className="text-sm text-danger font-bold text-center mb-2">
        ⌛ Mã OTP sẽ hết hạn sau {countdown}s
      </p>

      <OtpInput
        value={otp}
        onChange={handleChange}
        numInputs={6}
        inputType="text"
        renderSeparator="-"
        shouldAutoFocus
        renderInput={(props) => <input {...props} className="otp-input-fg" />}
      />

      <button onClick={handleVetifyOTP} className="forgot__password__form--btn">
        Xác nhận
      </button>
    </div>
  );
}
