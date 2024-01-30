function updateTabTitles() {
  chrome.tabs.query({}, function (tabs) {
    let count = 0;
    tabs.forEach(function (t) {
      // Increment count for every ungrouped tab
      if (t.groupId === -1) {
        count++;

        // Update title only for non-internal, ungrouped pages
        if (t.url && !t.url.startsWith("chrome://")) {
          let newTitle = "[" + count + "] ";
          chrome.scripting.executeScript({
            target: { tabId: t.id },
            func: setTitle,
            args: [newTitle],
          });
        }
      }
    });
  });
}

function setTitle(newTitle) {
  document.title = newTitle;
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    updateTabTitles();
  }
});

chrome.tabs.onRemoved.addListener(function () {
  updateTabTitles();
});
