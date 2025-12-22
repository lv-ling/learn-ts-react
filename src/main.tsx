import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import AntdConfigProvider from "./components/AntdConfigProvider";
import "./index.css";
import "./i18n"; // 初始化 i18n
import { enableMapSet } from "immer";

// 启用 Map 和 Set 的支持
enableMapSet();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AntdConfigProvider>
        <App />
      </AntdConfigProvider>
    </Provider>
  </React.StrictMode>
);
