"use client";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "@src/services";

function ProviderComponent({ main }: { main: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InnerProvider main={main} />
    </Provider>
  );
}

function InnerProvider({ main }: { main: React.ReactNode }) {

  return (
    <>
      <ToastContainer />
      {main}
    </>
  );
}

export default ProviderComponent;
