/* global chrome */

console.log("Background script running...");

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background:", message);

  if (message.type === "GET_INFO") {
    sendResponse({ data: "Hello from Background!" });
  }
});

// Example: Listen when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension Installed");
});

// Example: Listen when a tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    console.log(`Tab ${tabId} updated:`, tab);
  }
});
