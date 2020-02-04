const contextMenuItem = {
    id: "spendMoney",
    title: 'Spend Money',
    contexts: ['selection']
};

function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener((clickData) => {
    if (clickData.menuItemId === "spendMoney" && clickData.selectionText) {
        if (isInt(clickData.selectionText)) {
            chrome.storage.sync.get(['total', 'limit'], (budget) => {
                let newTotal = 0;
                if (budget.total) {
                    newTotal += parseInt(budget.total);
                }

                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({total: newTotal});

                if (newTotal > budget.limit) {
                    const notificationOptions = {
                        type: 'basic',
                        iconUrl: '../images/budget48.png',
                        title: 'Limit reached',
                        message: 'Uh oh! Looks like you have reached your limit'
                    };
                    chrome.notifications.create('limitNot', notificationOptions);
                }
            })
        }
    }
});

chrome.storage.onChanged.addListener((changes, storageName) => {
    chrome.browserAction.setBadgeText({text: changes.total.newValue.toString()});
});