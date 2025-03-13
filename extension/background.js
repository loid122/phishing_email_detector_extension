// Function to check if a URL is phishing using PhishTank API     Doesntwork yet , no phishtank api 11/3
async function checkUrlWithPhishTank(url) {
    const apiUrl = "http://checkurl.phishtank.com/checkurl/";
    const apiKey = "YOUR_PHISHTANK_API_KEY"; // Replace with your API key
  
    const payload = new URLSearchParams({
      url: url,
      format: "json",
      app_key: apiKey,
    });
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
  
      const data = await response.json();
      return data.results.in_database && data.results.valid; // True if phishing
    } catch (error) {
      console.error("Error checking URL:", error);
      return false; // Assume safe if API fails
    }
  }
  
  // Intercept web requests
  chrome.webRequest.onBeforeRequest.addListener(
    async (details) => {
      const url = details.url;
  
      // Check if the URL is phishing
      const isPhishing = await checkUrlWithPhishTank(url);
      if (isPhishing) {
        // Redirect to a blocked page
        return { redirectUrl: chrome.runtime.getURL("blocked.html") };
      }
    },
    { urls: ["<all_urls>"] }, // Monitor all URLs
    ["blocking"]
  );