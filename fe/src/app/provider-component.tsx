"use client";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "@src/services";
import { useEffect, useRef } from "react";
import LocalStorage from "@src/helpers/local-storage";
import { useAppDispatch, useAppSelector } from "@src/hooks/useHookReducers";
import { getCurrentUser } from "@src/services/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import useNotification from "@src/hooks/useNotification";
import { useRouter } from "next/navigation";
import CookieStorage from "@src/helpers/cookies";
import _ from "lodash";
import {
  getTrackingTime,
  increaseTodayTimeLearn,
  updateTrackingTime,
} from "@src/services/users";

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
  const lastMinuteRef = useRef<number | null>(null);

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
      const start = Number(sessionStorage.getItem("startTimeLearn"));
      const now = Date.now();
      const diffInMinutes = Math.floor((now - start) / 60000);

      if (!_.isEmpty(userInfor) && diffInMinutes > 0) {
        await dispatch(
          updateTrackingTime({
            userId: userInfor._id,
            timeLearn: diffInMinutes,
            date: new Date(),
          })
        ).unwrap();

        await dispatch(
          getTrackingTime({
            id: userInfor._id || "",
            parmas: {},
          })
        ).unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loaderStudyTrackTime = async () => {
    try {
      if (!_.isEmpty(userInfor)) {
        await dispatch(
          getTrackingTime({
            id: userInfor?._id || "",
            parmas: {},
          })
        ).unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (LocalStorage.getLocalStorage("access-token")) {
      loaderCurrentUser();
      const now = Date.now();
      sessionStorage.setItem("startTimeLearn", now.toString());
    }
  }, []);

  useEffect(() => {
    loaderStudyTrackTime();
  }, [userInfor]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const startInterval = () => {
      lastMinuteRef.current = new Date().getMinutes();
      interval = setInterval(() => {
        const currentMinute = new Date().getMinutes();
        if (lastMinuteRef.current !== currentMinute) {
          lastMinuteRef.current = currentMinute;
          dispatch(increaseTodayTimeLearn());
        }
      }, 1000);
    };

    const stopInterval = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopInterval();
      } else {
        startInterval();
      }
    };

    if (!document.hidden) startInterval();

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopInterval();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("beforeunload", updateStudyTrackingTime);
    return () => {
      window.removeEventListener("beforeunload", updateStudyTrackingTime);
    };
  }, [userInfor]);

  return (
    <>
      <ToastContainer />
      {main}
    </>
  );
}

export default ProviderComponent;
