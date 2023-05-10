function getElementText(element) {
  if (element && "innerText" in element) return element.innerText;
  return "";
}

function getSelectorText(selector) {
  const element = document.querySelector(selector);
  return getElementText(element);
}

function getUniqueText(selector) {
  const parentElement = document.querySelector(selector);

  if (!parentElement) return "";

  let uniqueText = "";
  const elements = parentElement.querySelectorAll("*");

  elements.forEach((element) => {
    if (element.getAttribute("aria-hidden") === "true") {
      return;
    }

    let text = "";

    if (element.tagName === "SCRIPT" || element.tagName === "STYLE") {
      // ignore script and style elements
      return;
    } else if (
      element.childNodes.length === 1 &&
      element.firstChild.nodeType === Node.TEXT_NODE
    ) {
      // element has only one text child
      text = getElementText(element);
    } else {
      // element has multiple child nodes
      const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        //@ts-ignore
        false
      );

      while (walker.nextNode()) {
        const node = walker.currentNode;

        //@ts-ignore
        if (node.parentNode?.getAttribute("aria-hidden") !== "true") {
          text += node.nodeValue;
        }
      }
    }

    if (text !== "") {
      if (uniqueText.includes(text)) {
        return;
      }

      uniqueText += text;
    }
  });

  uniqueText = uniqueText.replace(/\s+/g, " ");

  return uniqueText.trim();
}

function getProfile() {
  const name = getSelectorText(".text-heading-xlarge");
  const role = getSelectorText(".text-body-medium");
  const about = getSelectorText("#about + div + div");

  const jobExperience = getUniqueText("#experience + div + div");

  const profile = `Name: ${name}
Role: ${role}

About: ${about}

Experience: ${jobExperience}`;

  return profile;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.command) {
    case "get:profile":
      sendResponse({ profile: getProfile() });
  }
});
