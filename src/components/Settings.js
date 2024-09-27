// src/components/Settings.js

import React, { useState, useEffect } from "react";
import { saveSettings, getSettings } from "../utils/storageUtils";

const Settings = () => {
  const [captureInterval, setCaptureInterval] = useState(5); // 기본 주기: 5초
  const [targetWebsites, setTargetWebsites] = useState(""); // 기본 웹사이트 목록

  // 초기 설정을 불러오는 함수
  useEffect(() => {
    getSettings().then((settings) => {
      if (settings.captureInterval) {
        setCaptureInterval(settings.captureInterval);
      }
      if (settings.targetWebsites) {
        setTargetWebsites(settings.targetWebsites);
      }
    });
  }, []);

  // 설정 저장 핸들러
  const handleSave = () => {
    const newSettings = {
      captureInterval,
      targetWebsites,
    };
    saveSettings(newSettings);
    alert("Settings saved successfully!");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Extension Settings</h2>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Capture Interval (in seconds):
          <input
            type="number"
            value={captureInterval}
            onChange={(e) => setCaptureInterval(Number(e.target.value))}
            style={{ marginLeft: "10px", width: "60px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Target Websites (comma separated):
          <textarea
            value={targetWebsites}
            onChange={(e) => setTargetWebsites(e.target.value)}
            rows="3"
            style={{ width: "100%" }}
            placeholder="e.g., youtube.com, example.com"
          />
        </label>
      </div>
      <button onClick={handleSave} style={{ padding: "10px 20px" }}>
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
