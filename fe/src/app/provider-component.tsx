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
  const timeLearnRef = useRef<number>(0);

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
        router.push("/contact");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loaderStudyTrackTime = async () => {
    try {
      if (!_.isEmpty(userInfor)) {
        const res = await dispatch(
          getTrackingTime({
            id: userInfor._id,
            parmas: {},
          })
        ).unwrap();

        if (res?.data?.records?.length) {
          timeLearnRef.current =
            res.data.records[res.data.records.length - 1]?.timeLearn || 0;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateStudyTrackingTime = _.throttle(async () => {
    try {
      if (!_.isEmpty(userInfor) && timeLearnRef.current > 0) {
        await dispatch(
          updateTrackingTime({
            timeLearn: timeLearnRef.current,
          })
        ).unwrap();
      }
    } catch (error) {
      console.error(error);
    }
  }, 60000); 

  useEffect(() => {
    if (LocalStorage.getLocalStorage("access-token")) {
      loaderCurrentUser();
    }
  }, []);

  useEffect(() => {
    loaderStudyTrackTime();
  }, [userInfor]);

  useEffect(() => {
    if (_.isEmpty(userInfor)) return;

    const interval = setInterval(() => {
      timeLearnRef.current++;
      dispatch(increaseTodayTimeLearn());
      updateStudyTrackingTime();
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch, userInfor]);

  return (
    <>
      <ToastContainer />
      {main}
    </>
  );
}

export default ProviderComponent;
