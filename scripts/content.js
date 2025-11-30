





// Re-run when YouTube loads new content dynamically
const observer = new MutationObserver(() => {
    manipulateDOM();
});
observer.observe(document.body, { childList: true, subtree: true });

//Initial call
manipulateDOM();

function manipulateDOM(){
    //window.youtubeUtils.disableAutoPlay();
    //window.youtubeUtils.blockYouTubeInfiniteScroll();
    //window.youtubeUtils.hideYouTubeDescription();
   // window.youtubeUtils.blockYouTubeVideos(["a", "TestKeyword", "Sample"]);
   //window.youtubeUtils.blurYouTubeThumbnails();
   //window.youtubeUtils.hideYouTubeLiveChat();
   window.youtubeUtils.makeYouTubeGrayscale();
}


//for times
// Send a message to background every second while on YouTube
let timer = setInterval(() => {
    chrome.runtime.sendMessage({action: "incrementTime", amount: 1});
}, 1000);

// Optional: Stop counting if user leaves YouTube
window.addEventListener("beforeunload", () => {
    clearInterval(timer);
});