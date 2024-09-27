// src/OptionsApp.js

import React from "react";
import ReactDOM from "react-dom";
import Settings from "./components/Settings";
import "./styles/options.css"; // 스타일링 파일 추가

const OptionsApp = () => {
  return (
    <div>
      <Settings />
    </div>
  );
};

ReactDOM.render(<OptionsApp />, document.getElementById("options-root"));
