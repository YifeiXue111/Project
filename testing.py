from openai import OpenAI

client = OpenAI(api_key="screte key")

# Set your OpenAI API key

def summarize_text(paragraph):
    # Use the new API format to create a completion
    response = client.chat.completions.create(model="gpt-4o-mini",  # Specify the model you want to use
    messages=[
        {"role": "system", "content": "You are a helpful assistant that summarizes text."},
        {"role": "user", "content": f"Please summarize the following paragraph:\n\n{paragraph}"}
    ],
    max_tokens=150,  # Adjust this based on the expected length of the summary
    temperature=0.5  # Lower values give more deterministic responses)
    )
    # Extract the summary from the response
    summary = response.choices[0].message.content
    return summary

# Example paragraph to summarize
selected_paragraph = """
OpenAI's ChatGPT is a conversational AI model that enables interactive dialogues. 
It uses advanced machine learning techniques to understand and generate human-like text responses. 
This technology can be applied in various areas such as customer service, content creation, and educational tools.
"""

# Get the summary
summary = summarize_text(selected_paragraph)

# Output the summary
print("Summary:")
print(summary)

