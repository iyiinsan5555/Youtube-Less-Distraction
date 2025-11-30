window.youtubeUtils = {
    hideShorts() {
        const selectors = [
            "ytd-rich-section-renderer",     // Shorts shelf on home
            "ytd-reel-shelf-renderer",       // Shorts shelf under videos
            "ytd-shorts",                    // Shorts page elements
            "ytd-video-renderer[is-shorts]", // Shorts on feed
            "a[href^='/shorts']"             // Shorts links
        ];

        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                el.style.display = "none";
            });
        });
    },


    hideHomeFeed() {
    const selectors = [
        "ytd-rich-grid-renderer", // Home video grid
        "ytd-browse[page-subtype='home']" // Entire home container
    ];

    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            el.style.display = "none";
        });
    });
    },

    hideRecommended() {
        const selectors = [
            "#related",                       // Sidebar recommended (Up Next)
            "ytd-item-section-renderer",      // Recommended under video
            "ytd-watch-next-secondary-results-renderer", // Watch next container
            "ytd-watch-next-feed-renderer"    // Older layout support
        ];

        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                el.style.display = "none";
            });
        });
    },

    hideAdds() {
        const selectors = [
            "ytd-engagement-panel-section-list-renderer", //vide of video adds
            "ytd-in-feed-ad-layout-renderer" //main page adds
        ];

        if (document.querySelector("ytd-in-feed-ad-layout-renderer")) {
            const mainAdd = document.querySelector("ytd-in-feed-ad-layout-renderer").parentElement.parentElement.parentElement.parentElement;
             mainAdd.style.display = "none";
             mainAdd.remove();
        }

        if ( document.querySelector("ytd-engagement-panel-section-list-renderer")){
            document.querySelector("ytd-engagement-panel-section-list-renderer").remove();
        }
    },


    hideSidebar() {
        const selectors = [
            "#guide",                       // Main sidebar container
            "ytd-mini-guide-renderer",      // Collapsed sidebar
            "tp-yt-paper-listbox",          // Sidebar list container
            "ytd-guide-renderer",            // Another layout variant
            "#secondary"
        ];

        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                el.style.display = "none";
            });
        });
    },

    hideTrending() {
        const selectors = [
            "a[href*='feed/trending']",         // Sidebar "Trending" link
            "ytd-explore-pyv-renderer",         // Explore/Trending page layout
            "ytd-expanded-shelf-contents-renderer", // Trending shelves
            "ytd-video-renderer[is-trending]"   // Any trending-marked videos
        ];

        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                el.style.display = "none";
            });
        });
    },

    hideComments() {
        const selectors = [
            "#comments",         // Main comments container
            "ytd-comments",      // Wrapper element
            "ytd-item-section-renderer" // Individual comment sections
        ];

        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                el.style.display = "none";
            });
        });
    },


    disableAutoPlay() {
        // Try to find the autoplay toggle button on the video page
        const autoPlayButton = document.getElementsByClassName("ytp-button ytp-autonav-toggle")[0];
        const infoElement = document.getElementsByClassName("ytp-autonav-toggle-button")[0];
        console.log("function called");
        if (autoPlayButton && infoElement) {
            let isOpen = infoElement.getAttribute("aria-checked") === "true";
            console.log("passed first condition")
            if (isOpen) {
                console.log("found button");
                autoPlayButton.click();
                console.log("closed auto play")
            }
        }

        // Also prevent autoplay on next video by setting player options
        const player = document.querySelector("video");
        if (player) {
            player.autoplay = false;
        }
    },

    blockYouTubeInfiniteScroll() {
        let observer = new MutationObserver(mutations => {
            // Remove the "next page" continuation element
            document.querySelectorAll('ytd-continuation-item-renderer, ytd-watch-next-secondary-results-renderer').forEach(el => {
                el.remove();
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Prevent default scroll behavior that triggers loading
        window.addEventListener('scroll', () => {
            const scrollable = document.scrollingElement || document.documentElement;
            if (scrollable.scrollTop + window.innerHeight >= scrollable.scrollHeight) {
                scrollable.scrollTop -= 1; // stop reaching bottom
            }
        }, { passive: false });
    },

    hideYouTubeDescription() {
        const style = document.createElement('style');
        style.textContent = `
            #description {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    },


    blockYouTubeVideos(keywords) {
        const videos = document.querySelectorAll('ytd-rich-grid-renderer');

        videos.forEach(video => {
            const h3Elements = video.getElementsByTagName("h3");

            Array.from(h3Elements).forEach(h3 => {
                const title = h3.getAttribute("title");
                if (!title) return;

                console.log(title);

                // Check if any keyword matches
                if (keywords.some(keyword => title.toLowerCase().includes(keyword.toLowerCase()))) {
                    const parent = h3.closest('ytd-rich-item-renderer'); // safest parent to remove
                    if (parent) {
                        parent.remove();
                    }
                }
            });
        });
    },


    blurYouTubeThumbnails(blurAmount = "10px") {
        // Select all video thumbnails
        const thumbnails = document.getElementsByClassName("ytThumbnailViewModelImage");

        Array.from(thumbnails).forEach(thumbnail => {
            const img = thumbnail.getElementsByTagName("img")[0];
            if (img) {
                img.style.filter = `blur(${blurAmount})`;
            }
        });

        const shortsImages = document.getElementsByClassName("shortsLockupViewModelHostThumbnail");
        Array.from(shortsImages).forEach(shorts => {
            shorts.style.filter = `blur(${blurAmount})`;
        });

    },

    hideYouTubeLiveChat() {
        const chatSelectors = [
            "ytd-live-chat-frame",   // main live chat container
            "#chat",                 // older layout
            "ytd-live-chat-renderer" // embedded live chat
        ];

        chatSelectors.forEach(sel => {
            const chatElements = document.querySelectorAll(sel);
            chatElements.forEach(chat => {
                chat.style.display = "none";
            });
        });
    },

    makeYouTubeGrayscale() {
        const style = document.createElement('style');
        style.textContent = `
            html, body, #container, ytd-app {
                filter: grayscale(100%) !important;
            }
        `;
        document.head.appendChild(style);
    }





};

