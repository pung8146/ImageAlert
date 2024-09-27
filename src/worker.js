// src/worker.js

// Web Worker에서 사용할 이미지 비교 함수
self.addEventListener("message", (event) => {
  const { uploadedImage, screenshot } = event.data;
  compareImages(uploadedImage, screenshot)
    .then((isMatch) => {
      self.postMessage({ isMatch });
    })
    .catch((error) => {
      console.error("Error comparing images:", error);
      self.postMessage({ error });
    });
});

// 이미지 비교 함수 (pixelmatch를 사용)
function compareImages(uploadedImage, screenshot) {
  return new Promise((resolve, reject) => {
    const img1 = new Image();
    const img2 = new Image();
    img1.src = uploadedImage;
    img2.src = screenshot;

    img1.onload = () => {
      img2.onload = () => {
        try {
          // 캔버스를 이용하여 이미지 비교
          const canvas = new OffscreenCanvas(img1.width, img1.height);
          const ctx = canvas.getContext("2d");

          // 업로드된 이미지를 캔버스에 그림
          ctx.drawImage(img1, 0, 0);

          // 비교할 이미지(스크린샷)를 투명도 0.5로 캔버스에 그림
          ctx.globalAlpha = 0.5;
          ctx.drawImage(img2, 0, 0);

          // 캔버스 데이터를 비교하여 유사도 계산
          const imageData1 = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img2, 0, 0);
          const imageData2 = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );

          // pixelmatch를 사용하여 두 이미지의 차이를 비교
          const diff = pixelmatch(
            imageData1.data,
            imageData2.data,
            null,
            canvas.width,
            canvas.height,
            { threshold: 0.1 } // 유사도 임계값
          );

          // 차이점이 일정 기준 이하이면 일치로 간주
          resolve(diff < 1000); // 1000은 임의의 기준 값, 조절 가능
        } catch (error) {
          reject(error);
        }
      };
    };
  });
}

// `pixelmatch` 라이브러리를 포함해야 함
// <script src="https://unpkg.com/pixelmatch"></script> 를 포함한 상태여야 함
