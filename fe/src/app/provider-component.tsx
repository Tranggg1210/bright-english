"use client";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "@src/services";
import { useEffect } from "react";
import LocalStorage from "@src/helpers/local-storage";
import { useAppDispatch, useAppSelector } from "@src/hooks/useHookReducers";
import { getCurrentUser } from "@src/services/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import useNotification from "@src/hooks/useNotification";
import { useRouter } from "next/navigation";
import CookieStorage from "@src/helpers/cookies";
import _ from "lodash";
import { getTrackingTime, updateTrackingTime } from "@src/services/users";

function ProviderComponent({ main }: { main: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InnerProvider main={main} />
    </Provider>
  );
}

function InnerProvider({ main }: { main: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { notify } = useNotification();
  const router = useRouter();
  const { userInfor } = useAppSelector((state) => state.auth);

  const loaderCurrentUser = async () => {
    try {
      const res = await dispatch(getCurrentUser({})).unwrap();
      if (res?.data?.user?.isLocked) {
        notify(
          "warning",
          "Tài khoản của bạn đã bị khóa, vui lòng liên hệ với chúng tôi để biết thêm chi tiết!"
        );
        LocalStorage.removeLocalStorage(undefined, true);
        CookieStorage.removeCookie(undefined, true);
        setTimeout(() => {
          router.push("/contact");
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateStudyTrackingTime = async () => {
    try {
      if (!_.isEmpty(userInfor)) {
        const res = await dispatch(
          updateTrackingTime({
            userId: userInfor?._id,
            timeLearn: 1,
            date: new Date(),
          })
        ).unwrap();
        if (res) {
          await dispatch(
            getTrackingTime({
              id: userInfor?._id || "",
              parmas: {},
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loaderStudyTrackTime = async () => {
    try {
      if (!_.isEmpty(userInfor)) {
        const res = await dispatch(
          getTrackingTime({
            id: userInfor?._id || "",
            parmas: {},
          })
        ).unwrap();
        if (res && res?.data?.records.length === 0) {
          updateStudyTrackingTime();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (LocalStorage.getLocalStorage("access-token")) {
      loaderCurrentUser();
    }
  }, []);

  useEffect(() => {
    loaderStudyTrackTime();
  }, [userInfor]);

  return (
    <>
      <ToastContainer />
      {main}
    </>
  );
}

export default ProviderComponent;
