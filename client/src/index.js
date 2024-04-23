import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ConfigProvider } from "antd";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#40513B",
            colorPrimaryHover: "#40513B",
            borderRadius: "2px",
            boxShadow: "none"
          },
        },
        token: {
          borderRadius: "2px",
          colorPrimary: "#40513B"
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
