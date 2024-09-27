chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "IMAGE_MATCHED") {
    sendNotification(message.url);
  }
});

const sendNotification = (imageUrl) => {
  // 텔레그램 봇 토큰과 채팅 ID 설정
  const botToken = "YOUR_TELEGRAM_BOT_TOKEN";
  const chatId = "YOUR_CHAT_ID";

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: `Matched image found: ${imageUrl}`,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log("Notification sent:", data))
    .catch((error) => console.error("Error sending notification:", error));
};
