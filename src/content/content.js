/* global chrome */
import { compareImages } from "../utils/imageComparison";

const checkImages = () => {
  const images = document.getElementsByTagName("img");
  chrome.storage.sync.get(["savedImages"], (result) => {
    const savedImages = result.savedImages || [];
    for (let img of images) {
      savedImages.forEach(async (savedImg) => {
        if (await compareImages(img.src, savedImg)) {
          chrome.runtime.sendMessage({ type: "IMAGE_MATCHED", url: img.src });
        }
      });
    }
  });
};

// 페이지 로드 시 이미지 체크
checkImages();

// DOM 변경 감지 및 새로운 이미지 체크
const observer = new MutationObserver(checkImages);
observer.observe(document.body, { childList: true, subtree: true });
