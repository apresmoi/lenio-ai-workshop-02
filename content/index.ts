chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.command) {
    case "get:profile":
      sendResponse({ profile: "" });
  }
});
