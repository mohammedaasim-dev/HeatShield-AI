import os

try:
    from dotenv import load_dotenv
except ModuleNotFoundError:
    def load_dotenv():
        return None

# Load .env if available
load_dotenv()


def generate_explanation(temperature, humidity, ndvi, builtup, population, risk):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return "AI explanation unavailable because the GEMINI_API_KEY is not set."

    try:
        import google.generativeai as genai
    except ModuleNotFoundError:
        return "AI explanation unavailable because the AI client is not installed."

    if not hasattr(genai, "configure"):
        return "AI explanation unavailable because the AI client is not supported."

    try:
        genai.configure(api_key=api_key)
    except Exception:
        return "AI explanation unavailable due to AI client configuration error."

    prompt = (
        f"Analyze the following Urban Heat Island prediction and return a short explanation. "
        f"Temperature: {temperature}°C Humidity: {humidity}% NDVI: {ndvi} Built-up Area: {builtup}% Population: {population} "
        f"Predicted Risk: {risk}"
    )

    if hasattr(genai, "generate_text"):
        try:
            response = genai.generate_text(
                model="gemini-2.5-flash",
                input=prompt
            )
            return getattr(response, "text", str(response))
        except Exception:
            return "AI explanation unavailable due to generation error."

    return "AI explanation unavailable because the AI client library does not expose a supported generation method."
