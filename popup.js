// document.addEventListener('DOMContentLoaded', function() {
//     // Button 1 event listener
//     document.getElementById('summarize all').addEventListener('click', function() {
//         console.log('Button 1 clicked');
//         // Add action for Button 1
//     });

//     // Button 2 event listener
//     document.getElementById('summarize selected').addEventListener('click', function() {
//         console.log('Button 2 clicked');
//         // Add action for Button 2
//     });
// });
document.getElementById("fetch-summary").addEventListener("click", () => {
    // Inform the background script to fetch highlighted text
    chrome.runtime.sendMessage({ action: "getHighlightedParagraphs" }, (response) => {
        if (response && response.paragraphs) {
            const paragraphs = response.paragraphs.join("\n\n");

            // Call the summarizeText function using OpenAI API
            summarizeText(paragraphs).then((result) => {
                if (result) {
                    // Display the summary in the popup
                    document.getElementById("summary").textContent = result;
                } else {
                    document.getElementById("summary").textContent = "Failed to generate summary.";
                }
            });
        } else {
            document.getElementById("summary").textContent = "No highlighted text found!";
        }
    });
});

// Function to summarize text using OpenAI
async function summarizeText(text) {
    try {
        const openai = new OpenAI({
            apiKey: "your-api-key-here", // Replace with your actual API key
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: `Please summarize the following text: ${text}` }],
            max_tokens: 100,
            temperature: 0.7,
        });

        if (completion && completion.choices && completion.choices[0].message) {
            return completion.choices[0].message.content;
        } else {
            return "No summary generated.";
        }
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        return "Error generating summary.";
    }
}
