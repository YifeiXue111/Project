import OpenAI from "openai";

// Initialize the OpenAI client with your API key
const openai = new OpenAI({
  apiKey: '----', // Replace with your actual API key
});

async function summarizeText(text) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: `Summarize this text: ${text}` }],
            max_tokens: 100,
            temperature: 0.7
        });

        // Log the full response to inspect it
        console.log(completion);

        // Safely access choices only if it exists
        if (completion && completion.choices) {
            console.log(completion.choices[0].message.content);
        } else {
            console.log("No choices in response. Check the response structure:", completion);
        }
    } catch (error) {
        console.error("Error with API request:", error);
    }
}

const text = "Your text to summarize here.";
summarizeText(text);
