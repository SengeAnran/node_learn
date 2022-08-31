chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // console.log(tabId, changeInfo, tab);
  if (changeInfo.url) {
    fetch(`http://172.16.24.1/api/chrome/receive?url=${encodeURIComponent(changeInfo.url)}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }
});