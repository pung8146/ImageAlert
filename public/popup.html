/* global chrome */
import React, { useState, useEffect } from "react";

const Popup = () => {
  const [savedImages, setSavedImages] = useState([]);
  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    // 저장된 이미지 로드
    chrome.storage.sync.get(["savedImages"], (result) => {
      setSavedImages(result.savedImages || []);
    });
  }, []);

  const handleAddImage = () => {
    if (newImage) {
      const updatedImages = [...savedImages, newImage];
      chrome.storage.sync.set({ savedImages: updatedImages }, () => {
        setSavedImages(updatedImages);
        setNewImage("");
      });
    }
  };

  return (
    <div>
      <h1>ImageAlert</h1>
      <input
        type="text"
        value={newImage}
        onChange={(e) => setNewImage(e.target.value)}
        placeholder="Enter image URL"
      />
      <button onClick={handleAddImage}>Add Image</button>
      <ul>
        {savedImages.map((img, index) => (
          <li key={index}>{img}</li>
        ))}
      </ul>
    </div>
  );
};

export default Popup;
