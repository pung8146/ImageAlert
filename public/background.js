// public/background.js

// 초기 설정: 이미지 비교 주기와 업로드된 이미지 데이터 초기화
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(
    {
      captureInterval: 5, // 기본 주기: 5초
      uploadedImage: null, // 업로드된 이미지 데이터 초기화
    },
    () => {
      console.log("Default settings saved");
    }
  );
});

// 알람을 통해 주기적으로 작업을 수행
chrome.alarms.create("captureAlarm", { periodInMinutes: 1 }); // 1분마다 알람 발생

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "captureAlarm") {
    // 현재 탭을 확인하고, 스크린샷 캡처 및 이미지 비교 실행
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab) {
        chrome.tabs.sendMessage(activeTab.id, { action: "captureAndCompare" });
      }
    });
  }
});

// 사용자가 설정을 변경할 때마다 주기를 업데이트
chrome.storage.onChanged.addListener((changes) => {
  if (changes.captureInterval) {
    const newInterval = changes.captureInterval.newValue;
    chrome.alarms.clear("captureAlarm");
    chrome.alarms.create("captureAlarm", { periodInMinutes: newInterval / 60 }); // 초 단위를 분 단위로 변환
    console.log(`Capture interval updated to ${newInterval} seconds`);
  }
});
