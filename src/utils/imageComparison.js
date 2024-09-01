export const compareImages = async (img1, img2) => {
  // 간단한 URL 비교 (실제로는 더 정교한 비교 알고리즘을 사용해야 합니다)
  return img1 === img2;
};

// 실제 구현에서는 perceptual hashing 등의 알고리즘을 사용해야 합니다.
// 예: pHash, aHash, dHash 등
