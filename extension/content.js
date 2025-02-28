// Gmail loading Time
setTimeout(() => {
    const emailBody = document.querySelector(".a3s.aiL").innerText;
  
    chrome.runtime.sendMessage(
      { action: "checkPhishing", emailContent: emailBody },
      (response) => {
        if (response.result) {
          alert("🚨 Possible phishing attempt detected!");
        }
      }
    );
  }, 5000);
