document.getElementById("reportButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0].url;
      if (url) {
        // Send the URL to your backend or log it
        console.log("Reported URL:", url);
        alert("Thank you for reporting this URL. We will investigate it.");
      }
    });
  });