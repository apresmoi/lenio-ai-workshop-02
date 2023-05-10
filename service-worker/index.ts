chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete" && tab.active && tabId) {
    if (tab.url.startsWith("https://www.linkedin.com/in")) {
        console.log('Tab is a profile')
    }
  }
});
