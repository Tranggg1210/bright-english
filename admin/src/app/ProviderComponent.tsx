"use client";

import { Provider } from "react-redux";
import { ConfigProvider, theme as antdTheme } from "antd";
import store from "@src/services";

function ProviderComponent({ main }: { main: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: antdTheme.defaultAlgorithm,
          token: {
            colorPrimary: "#4267CD",
            borderRadius: 8,
            fontSize: 14,
            padding: 8
          },
        }}
      >
        {main}
      </ConfigProvider>
    </Provider>
  );
}

export default ProviderComponent;
