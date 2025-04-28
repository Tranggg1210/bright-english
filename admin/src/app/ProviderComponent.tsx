"use client";

import { Provider } from "react-redux";
import { ConfigProvider, theme as antdTheme } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import store from "@src/services";
import { getCurrentUser } from "@src/services/auth";
import CookieStorage from "@src/helpers/cookies";
import { useAppDispatch } from "@src/hooks/useHookReducers";

function ProviderComponent({ main }: { main: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InnerProvider main={main} />
    </Provider>
  );
}

function InnerProvider({ main }: { main: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loadUserInfo = async () => {
    try {
      const res = await dispatch(getCurrentUser({}));
      console.log(res);
    } catch (error) {
      console.error(error);
      toast.error("Đăng nhập thất bại, vui lòng kiểm tra tài khoản hoặc mật khẩu của bạn!");
    }
  };

  useEffect(() => {
    const accessToken = CookieStorage.getCookie("access-token");
    if (!accessToken) {
      router.push("/login");
    } else {
      loadUserInfo();
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <ConfigProvider
        theme={{
          algorithm: antdTheme.defaultAlgorithm,
          token: {
            colorPrimary: "#4267CD",
            borderRadius: 8,
            fontSize: 14,
            padding: 8,
          },
        }}
      >
        {main}
      </ConfigProvider>
    </>
  );
}

export default ProviderComponent;
