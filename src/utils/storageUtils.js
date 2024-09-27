// src/utils/storageUtils.js

// 설정 값을 저장하는 함수
export const saveSettings = (settings) => {
  chrome.storage.sync.set(settings, () => {
    console.log("Settings saved:", settings);
  });
};

// 설정 값을 불러오는 함수
export const getSettings = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["captureInterval", "targetWebsites"], (result) => {
      resolve({
        captureInterval: result.captureInterval || 5, // 기본값: 5초
        targetWebsites: result.targetWebsites || "", // 기본 웹사이트 목록
      });
    });
  });
};
