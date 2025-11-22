//able to manipulate content of page (DOM)
// remove shorts
// make a button to show videos
// after clicking video ask for confirmation
//injects every time when page is reloaded

// Function to run whenever a new video loads
function onVideoChange() {
    console.log("Video changed or clicked!");
    // You can run your distraction-hiding logic here
}

function videoClicked(videoLink){
    //Send message to service worker (background)
    chrome.runtime.sendMessage({
        type: "video_clicked", //Event type
        video_link: videoLink
    })

    //manipulate DOM and open confirmation.html
    
}

let videosHidden = true;

let recommendedHidden = true;
let commentsHidden = true;
let liveChatHidden = true;
let playlistHidden = true;
let sideBarHidden = true;


// Detect URL changes using history API
let lastUrl = location.href;
new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        console.log("url changed");
        chrome.runtime.sendMessage({type:"url_changed"})
        if (currentUrl.includes("watch")) {
            onVideoChange();
            videoClicked(currentUrl)  //ATTENTION!!!
        }
    }
}).observe(document, {subtree: true, childList: true});


//manipulate main youtube page
setInterval(()=>{
    manipulateDOM();
}, 500)




function manipulateDOM(){
    hideShorts();
    makeShowVideosButton();
    makePluginBarForVideo();
    closeShortsURL();

    hideRecommended(recommendedHidden);
    hideComments(commentsHidden);
    hideLiveChat(liveChatHidden);
    hidePlaylists(playlistHidden);
    hideSidebar(sideBarHidden);

    hideVideos(videosHidden);
}


function hideShorts(){
    // Remove all Shorts sections
    const shortsSections = document.querySelectorAll('ytd-rich-shelf-renderer[is-shorts]');
    shortsSections.forEach(section => section.remove());

}



function makeShowVideosButton(){
    //if not main page do not do anything
    if (document.URL != "https://www.youtube.com/") return;
    // Avoid creating multiple buttons
    if (document.querySelector("#show-videos-btn") || !videosHidden) return;

    const button = document.createElement('button');
    button.id = 'show-videos-btn';
    button.innerText = 'Show Videos';
    button.style.position = 'fixed';
    button.style.top = '50%';
    button.style.left = '50%';
    button.style.transform = 'translate(-50%, -50%)'; // center exactly
    button.style.zIndex = '1000';
    button.style.padding = '10px 20px';
    button.style.fontSize = '16px';


    button.onclick = () => {
        hideVideos(false);
        videosHidden = false;
        button.remove();
    };

    document.body.appendChild(button);
    
}

function hideVideos(hide) {
    //if not main page do not do anything
    if (document.URL != "https://www.youtube.com/") return;
    // Hide the main grid of videos
    const mainGrid = document.querySelector('ytd-rich-grid-renderer');
    if (mainGrid) mainGrid.style.display = hide ? 'none' : 'block';

    // Hide other main content sections if needed
    const contents = document.querySelectorAll('#contents ytd-rich-section-renderer');
    contents.forEach(section => section.style.display = hide ? 'none' : 'block');
}






function makePluginBarForVideo(){
    const container = document.querySelector("#above-the-fold")

    if (!container || document.querySelector("#pluginDiv")) return;

    const divEl = document.createElement("div");
    divEl.id = "pluginDiv";

    Object.assign(divEl.style, {
        width: "100% - 20px",
        height: "100px",
        margin: "25px 0 25px 0",
        display: "flex",
        "flex-direction": "row",
        "align-items": "center",
        "justify-content": "center",
        backgroundColor: "#272727",
        borderRadius: "10px",
        padding: "0px 20px",
    })

    const buttonsCss = {
        backgroundColor : "white",
        border: "none",
        cursor: "pointer",
        margin: "0 10px 0 10px",
        padding: "10px 20px",
        color: "black",
        borderRadius: "5px",
    }

    const recommendedEl = document.createElement("button");
    recommendedEl.innerHTML = "Show Recommended";
    Object.assign(recommendedEl.style, buttonsCss);

    const commentsEl = document.createElement("button");
    commentsEl.innerHTML = "Show Comments";
    Object.assign(commentsEl.style, buttonsCss);

    const liveChatEl = document.createElement("button");
    liveChatEl.innerHTML = "Show Live Chat";
    Object.assign(liveChatEl.style, buttonsCss);

    const playlistEl = document.createElement("button");
    playlistEl.innerHTML = "Show Playlists";
    Object.assign(playlistEl.style, buttonsCss);
    
    const sideBarEl = document.createElement("button");
    sideBarEl.innerHTML = "Show Sidebar";
    Object.assign(sideBarEl.style, buttonsCss);

    // Append buttons
    divEl.appendChild(recommendedEl);
    divEl.appendChild(commentsEl);
    divEl.appendChild(liveChatEl);
    divEl.appendChild(playlistEl);
    divEl.appendChild(sideBarEl);

    container.appendChild(divEl);


    // Event listeners
    recommendedEl.addEventListener("click", () => {
    recommendedHidden = !recommendedHidden;
    hideRecommended(recommendedHidden);
    recommendedEl.innerText = recommendedHidden ? "Show Recommended" : "Hide Recommended";
    });

    commentsEl.addEventListener("click", () => {
    commentsHidden = !commentsHidden;
    hideComments(commentsHidden);
    commentsEl.innerText = commentsHidden ? "Show Comments" : "Hide Comments";
    });

    liveChatEl.addEventListener("click", () => {
    liveChatHidden = !liveChatHidden;
    hideLiveChat(liveChatHidden);
    liveChatEl.innerText = liveChatHidden ? "Show Live Chat" : "Hide Live Chat";
    });


    playlistEl.addEventListener("click", () => {
    playlistHidden = !playlistHidden;
    hidePlaylists(playlistHidden);
    playlistEl.innerText = playlistHidden ? "Show Playlists" : "Hide Playlists";
    });

    sideBarEl.addEventListener("click", () => {
    sideBarHidden = !sideBarHidden;
    hideSidebar(sideBarHidden);
    sideBarEl.innerText = sideBarHidden ? "Show Sidebar" : "Hide Sidebar";
    });
    
}

function hideComments(hide) {
    const comments = document.getElementById("comments");
    if (comments) {
        comments.style.display = hide ? "none" : "block";
    }
}

function hideRecommended(hide) {
    const recommended = document.getElementById("related");
    if (recommended) {
        recommended.style.display = hide ? "none" : "block";
    }
}

function hideLiveChat(hide) {
    // Live chat container has id 'chat'
    const liveChat = document.getElementById("chat");
    if (liveChat) liveChat.style.display = hide ? "none" : "block";
}

function hidePlaylists(hide) {
    // Find the playlist panel inside the sidebar
    const playlistPanel = document.querySelector("#secondary ytd-playlist-panel-renderer");
    if (playlistPanel) {
        playlistPanel.style.display = hide ? "none" : "block";
    }
}

function hideSidebar(hide) {
    const sidebar = document.getElementById("secondary");
    if (sidebar) sidebar.style.display = hide ? "none" : "block";
}

function closeShortsURL() {
    if (document.URL.includes("shorts")) {
        chrome.runtime.sendMessage({
            type:"close_shorts",
        })
    }
}