import OpenAI from "openai";

// Initialize the OpenAI client with your API key
const openai = new OpenAI({
  REPLACE, // Replace with your actual API key
});

async function summarizeText(text) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: `Please provide a detailed summary: ${text}` }],
            max_tokens: 100,
            temperature: 0.7
        });

        // Extract and store the summary content in a variable
        let summary = null;
        if (completion && completion.choices && completion.choices[0].message) {
            summary = completion.choices[0].message.content;
            console.log("Summary:", summary);  // Log the summary
        } else {
            console.log("No choices in response. Check the response structure:", completion);
        }

        return summary; // Return the summary for further use
    } catch (error) {
        console.error("Error with API request:", error);
        return null;  // Return null if there was an error
    }
}

// Function to get highlighted paragraphs and summarize them
function getAndSummarizeHighlightedText() {
    chrome.runtime.sendMessage({ action: "getHighlightedParagraphs" }, (response) => {
        if (response && response.paragraphs) {
            const paragraphs = response.paragraphs.join("\n\n");
            summarizeText(paragraphs).then((result) => {
                if (result) {
                    console.log("Final Summary:", result);
                } else {
                    console.log("No summary was generated.");
                }
            });
        } else {
            console.log("No highlighted paragraphs found!");
        }
    });
}

getAndSummarizeHighlightedText();
const paragraph = process.argv[2];
summarizeText(paragraph).then((result) => {
    if (result) {
        // Do something with the result if needed
        console.log("Final Summary:", result);
    } else {
        console.log("No summary was generated.");
    }
});
