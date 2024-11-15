chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getHighlightedParagraphs") {
        // Query the active tab to communicate with the content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) {
                console.error("No active tabs found.");
                sendResponse({ error: "No active tab detected." });
                return;
            }

            // Send a message to the content script to get highlighted paragraphs
            chrome.tabs.sendMessage(tabs[0].id, { action: "getHighlightedParagraphs" }, (response) => {
                if (chrome.runtime.lastError) {
                    // Log errors and return a failure response
                    console.error("Error communicating with content script:", chrome.runtime.lastError.message);
                    sendResponse({ error: "Failed to get highlighted paragraphs." });
                } else {
                    // Successfully received response
                    sendResponse(response);
                }
            });
        });

        // Keep the message channel open for asynchronous response
        return true;
    }
});
