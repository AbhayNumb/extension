var menuItem = {
  id: "spendMoney",
  title: "Spend Money",
  contexts: ["selection"],
};

function isInt(value) {
  return (
    !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10))
  );
}

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
  if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
    if (isInt(clickData.selectionText)) {
      chrome.storage.sync.get(["total", "limit"], function (budget) {
        var newTotal = 0;
        if (budget.total) {
          newTotal += parseInt(budget.total);
        }

        newTotal += parseInt(clickData.selectionText);
        chrome.storage.sync.set({ total: newTotal }, function () {
          if (newTotal >= budget.limit) {
            // this code required some notfication but not working notif
          }
        });
      });
    }
  }
});
// display as small badge below icon
chrome.storage.onChanged.addListener(function (changes, storageName) {
  chrome.browserAction.setBadgeText({
    text: changes.total.newValue.toString(),
  });
});
