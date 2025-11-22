const params = new URLSearchParams(location.search);
const videoURL = params.get("video");

console.log("Received video:", videoURL);

if (!videoURL) {
    window.close();
}

const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");

yesBtn.addEventListener("click", (ev)=>{
    window.location = videoURL;
})

noBtn.addEventListener("click", (ev)=>{
    window.close();
})