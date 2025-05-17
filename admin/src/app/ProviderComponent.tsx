"use client";

import { Provider } from "react-redux";
import { ConfigProvider, theme as antdTheme } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import store from "@src/services";
import { getCurrentUser, updateUserInfor } from "@src/services/auth";
import { useAppDispatch } from "@src/hooks/useHookReducers";
import _ from "lodash";
import LocalStorage from "@src/helpers/local-storage";

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
  const pathname = usePathname();

  const loadUserInfo = async () => {
    try {
      const res = await dispatch(getCurrentUser({})).unwrap();
      if(!_.isEmpty(res)){
        if(res?.data?.user?.role !== "admin"){
          toast.error("Bạn không phải admin! Hãy đăng nhập với quyền admin bạn nhé!");
          return;
        }else{
          updateUserInfor(res?.data?.user);
          router.push(pathname);
          return;
        }
      }

    } catch (error: any) {
      console.error(error);
      toast.error(error?.message)
    }
  };

  useEffect(() => {
    const accessToken = LocalStorage.getLocalStorage("access-token");
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
