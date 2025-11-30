// Initialize time if it doesn't exist
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get({youtubeTime: 0}, (data) => {
        if (data.youtubeTime === undefined) {
            chrome.storage.local.set({youtubeTime: 0});
        }
    });
});

// Listen for increment messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "incrementTime") {
        chrome.storage.local.get({youtubeTime: 0}, (data) => {
            let newTime = data.youtubeTime + message.amount;
            chrome.storage.local.set({youtubeTime: newTime}, () => {
                console.log("Total YouTube usage time:", newTime, "seconds");
            });
        });
    }
});
