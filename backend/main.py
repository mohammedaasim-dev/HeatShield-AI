from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
from ai_explanation import generate_explanation

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
    "https://heat-shield-ai-two.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HeatData(BaseModel):
    temperature: float
    humidity: float
    ndvi: float
    builtup: int
    population: int


model = joblib.load("model/heatshield_model.pkl")
def recommendation(risk):

    if risk == "High":
        return [
            "Plant more trees",
            "Install cool roofs",
            "Increase shaded areas",
            "Create water stations"
        ]

    elif risk == "Medium":
        return [
            "Increase green cover",
            "Monitor temperature",
            "Reduce concrete surfaces"
        ]

    else:
        return [
            "Maintain greenery",
            "Continue monitoring"
        ]


@app.get("/")
def home():
    return {"message": "Welcome to HeatShield AI Backend"}

@app.post("/predict")
def predict(data: HeatData):

    temperature = data.temperature
    humidity = data.humidity
    ndvi = data.ndvi
    builtup = data.builtup
    population = data.population

    new_data = pd.DataFrame([{
        "Temperature": temperature,
        "Humidity": humidity,
        "NDVI": ndvi,
        "Built-up": builtup,
        "Population": population
    }])

    prediction = model.predict(new_data)
    prediction_risk = prediction[0]

    suggestions = recommendation(prediction_risk)

    ai_explanation = generate_explanation(
            temperature,
            humidity,
            ndvi,
            builtup,
            population,
            prediction_risk
        )

    return {
    "Predicted Risk": prediction_risk,
    "Status": "Prediction Successful",
    "Recommendations": suggestions,
    "AI Explanation": ai_explanation
}
