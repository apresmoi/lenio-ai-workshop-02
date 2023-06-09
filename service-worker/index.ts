import { getOpenAIClassification } from "./openai";

function getAPIKey(): Promise<string> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["apikey"], function (result) {
      resolve(result.apikey);
    });
  });
}

function getProfileFromContent(tabId: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      chrome.tabs.sendMessage(
        tabId,
        { command: "get:profile" },
        function (response) {
          resolve(response.profile as string);
        }
      );
    }, 1000);
  });
}

function setLoading(loading: boolean): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ loading }, () => resolve());
  });
}

async function processTab(tabId: number) {
  await setLoading(true);
  const apikey = await getAPIKey();
  const profile = await getProfileFromContent(tabId);
  const classification = await getOpenAIClassification(
    profile,
    ["React", "Angular"],
    apikey
  );
  await setLoading(false);

  chrome.runtime.sendMessage({
    command: "set:profile",
    profile: classification,
  });
}

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete" && tab.active && tabId) {
    if (tab.url.startsWith("https://www.linkedin.com/in")) {
      console.log("Tab is a profile");
      processTab(tabId);
    }
  }
});
