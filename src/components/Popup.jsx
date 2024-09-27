// src/components/Popup.js

import React, { useState, useEffect } from "react";

const Popup = () => {
  const [captureActive, setCaptureActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  // 초기 설정을 가져오는 함수
  useEffect(() => {
    chrome.storage.sync.get(["captureActive", "uploadedImage"], (result) => {
      setCaptureActive(result.captureActive || false);
      setUploadedImage(result.uploadedImage || null);
    });
  }, []);

  // 캡처 상태를 토글하는 함수
  const toggleCapture = () => {
    const newStatus = !captureActive;
    chrome.storage.sync.set({ captureActive: newStatus });
    setCaptureActive(newStatus);
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result;
      setUploadedImage(imageData);
      chrome.storage.sync.set({ uploadedImage: imageData });
      // content.js에 업로드된 이미지 데이터 전송
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
          action: "setUploadedImage",
          imageData,
        });
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: "20px", width: "250px" }}>
      <h2>Image Alert</h2>
      <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      {uploadedImage && (
        <div>
          <img
            src={uploadedImage}
            alt="Uploaded Preview"
            style={{ width: "100%", marginTop: "10px" }}
          />
        </div>
      )}
      <button onClick={toggleCapture} style={{ marginTop: "10px" }}>
        {captureActive ? "Stop Comparison" : "Start Comparison"}
      </button>
    </div>
  );
};

export default Popup;
