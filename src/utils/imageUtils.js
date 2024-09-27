// src/utils/imageUtils.js
import pixelmatch from "pixelmatch";

// 두 이미지를 비교하는 함수
export const compareImages = (uploadedImage, screenshot) => {
  return new Promise((resolve) => {
    const img1 = new Image();
    const img2 = new Image();
    img1.src = uploadedImage;
    img2.src = screenshot;

    img1.onload = () => {
      img2.onload = () => {
        // 캔버스를 이용하여 이미지 비교
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img1.width;
        canvas.height = img1.height;

        // 업로드된 이미지를 캔버스에 그림
        ctx.drawImage(img1, 0, 0);

        // 비교할 이미지(스크린샷)를 투명도 0.5로 캔버스에 그림
        ctx.globalAlpha = 0.5;
        ctx.drawImage(img2, 0, 0);

        // 캔버스 데이터를 비교하여 유사도 계산
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const diff = pixelmatch(
          imageData.data, // 첫 번째 이미지 데이터
          imageData.data, // 두 번째 이미지 데이터
          null,
          canvas.width,
          canvas.height,
          { threshold: 0.1 } // 유사도 임계값
        );

        // 차이점이 일정 기준 이하이면 일치로 간주
        resolve(diff < 1000); // 1000은 임의의 기준 값, 조절 가능
      };
    };
  });
};
