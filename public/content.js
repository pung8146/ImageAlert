// public/content.js

// 업로드된 이미지 데이터를 저장할 변수
let uploadedImageData = null;

// 백그라운드 스크립트에서 메시지를 받을 때마다 동작
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "captureAndCompare") {
    captureScreen().then((screenshot) => {
      if (uploadedImageData) {
        // 업로드된 이미지와 현재 스크린샷을 비교
        compareImages(uploadedImageData, screenshot).then((isMatch) => {
          if (isMatch) {
            chrome.runtime.sendMessage({ action: "notifyMatch" });
          }
        });
      }
    });
    return true; // 비동기 응답을 위해 true 반환
  } else if (message.action === "setUploadedImage") {
    // 업로드된 이미지 데이터를 설정
    uploadedImageData = message.imageData;
  }
});

// 현재 웹페이지의 스크린샷을 캡처하는 함수
function captureScreen() {
  return new Promise((resolve, reject) => {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(dataUrl);
      }
    });
  });
}

// 두 이미지를 비교하는 함수 (간단히 설명)
function compareImages(uploadedImage, screenshot) {
  return new Promise((resolve) => {
    // 이미지 비교를 위한 canvas 설정
    const img1 = new Image();
    const img2 = new Image();
    img1.src = uploadedImage;
    img2.src = screenshot;

    img1.onload = () => {
      img2.onload = () => {
        // canvas를 이용하여 이미지 비교
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img1.width;
        canvas.height = img1.height;

        // 업로드된 이미지를 캔버스에 그림
        ctx.drawImage(img1, 0, 0);

        // 비교할 이미지 (스크린샷)를 투명도 0.5로 캔버스에 그림
        ctx.globalAlpha = 0.5;
        ctx.drawImage(img2, 0, 0);

        // 캔버스 데이터를 비교하여 유사도를 계산
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const diff = pixelmatch(
          imageData.data,
          imageData.data,
          null,
          canvas.width,
          canvas.height,
          { threshold: 0.1 }
        );

        // 차이점이 일정 기준 이하이면 일치로 간주
        resolve(diff < 1000); // 1000은 임의의 기준 값, 조절 가능
      };
    };
  });
}

// `pixelmatch` 라이브러리를 포함해야 함
// <script src="https://unpkg.com/pixelmatch"></script> 를 포함한 상태여야 함
