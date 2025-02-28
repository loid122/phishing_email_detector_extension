chrome.runtime.onInstalled.addListener(() => {
    console.log("Gmail Phishing Detector Installed");
  });
  
  // gets action from content.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkPhishing") {
      const isPhishing = detectPhishing(request.emailContent);
      sendResponse({ result: isPhishing });
    }
  });
  
  //Hardcoded trigger words 
  function detectPhishing(content) {
    const phishingIndicators = [
      "urgent action required",
      "verify account",
      "password reset",
      "suspicious activity",
      "click here",
      "verify fast",
      "Click this link",
      "account suspension",
      "change your password",
      "unusual activity detected",
      "immediate response needed",
      "your account will be closed",
      "last notice",
      "refund request",
      "open this attachment",
      "support team request",
      "confirm your credit card",
      "work from home opportunity",
      "exclusive reward",
      "you’ve won lottery",
      "lottery winner"

    ];
  
    function detectPhishing(content) {
        const lowerContent = content.toLowerCase();
        const matchCount = phishingIndicators.filter((phrase) =>
          lowerContent.includes(phrase)
        ).length;
      
        return matchCount >= 2; // Trigger only if 2 or more matches
      }
  }
  