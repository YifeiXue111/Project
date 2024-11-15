import requests
from bs4 import BeautifulSoup
import subprocess

def get_paragraphs(url):
    # Send a request to the website
    response = requests.get(url)
    response.raise_for_status()  # Raise an error if the request fails

    # Parse the HTML content
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all <p> tags and extract their text content
    paragraphs = [p.get_text() for p in soup.find_all('p')]

    return paragraphs

# Example usage
url = 'https://en.wikipedia.org/wiki/Pointer_(computer_programming)'  # Replace with the target URL
paragraphs = get_paragraphs(url)

paragraph_text = "\n".join(paragraphs)
subprocess.run(["node", "index.js", paragraph_text])
