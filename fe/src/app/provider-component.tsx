"use client";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "@src/services";
import {  useEffect } from "react";
import LocalStorage from "@src/helpers/local-storage";
import { useAppDispatch } from "@src/hooks/useHookReducers";
import { getCurrentUser } from "@src/services/auth";
import 'bootstrap/dist/css/bootstrap.min.css';


function ProviderComponent({ main }: { main: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InnerProvider main={main} />
    </Provider>
  );
}

function InnerProvider({ main }: { main: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const loaderCurrentUser = async () => {
    try {
      await dispatch(getCurrentUser({}));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (LocalStorage.getLocalStorage("access-token")) {
      loaderCurrentUser();
    }
  }, []);

  return (
    <>
      <ToastContainer />
      {main}
    </>
  );
}

export default ProviderComponent;
