//Works on the background like a server
//Can not reach to DOM of page

//Store

//Also called "Service Worker"

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

    const tabId = sender.tab?.id;  // <── GET TAB ID HERE (Important!!!)

    if (msg.type === "video_clicked") {
        let video_link = msg.video_link;

        chrome.tabs.create({
            url: chrome.runtime.getURL("assets/confirmation.html") + "?video=" + encodeURIComponent(video_link)
        });

        setTimeout(()=>{
            chrome.tabs.remove(tabId)
        }, 500);

    }
});


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    const tabId = sender.tab?.id;  // <── GET TAB ID HERE (Important!!!)

    if (msg.type === "close_shorts") {

        setTimeout(()=>{
            chrome.tabs.remove(tabId)
        }, 500);

    }
});


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    const tabId = sender.tab?.id;  // <── GET TAB ID HERE (Important!!!)
    if (msg.type === "url_changed") {
        setTimeout(()=>{
            chrome.tabs.reload(tabId)
        }, 500);
    }
});