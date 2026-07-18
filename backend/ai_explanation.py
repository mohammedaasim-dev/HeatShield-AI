import os
from dotenv import load_dotenv
from google import genai

# Load .env
load_dotenv()

# Create Gemini client
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def generate_explanation(temperature, humidity, ndvi, builtup, population, risk):

    prompt = f"""
You are an AI environmental expert.

Analyze the following Urban Heat Island prediction.

Temperature: {temperature}°C
Humidity: {humidity}%
NDVI: {ndvi}
Built-up Area: {builtup}%
Population: {population}
Predicted Risk: {risk}

Explain in simple English.

Return only in this format:

Summary:
(2-3 sentences)

Reasons:
- point 1
- point 2
- point 3

Recommendations:
- point 1
- point 2
- point 3
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text