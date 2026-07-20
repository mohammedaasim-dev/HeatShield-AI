import { useState, useEffect } from "react";
import "./App.css";
import "./Dashboard.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MapComponent from "./components/MapComponent";
import PredictionPanel from "./components/PredictionPanel";
import PredictionCard from "./components/PredictionCard";
import SummaryCards from "./components/SummaryCards";
import Analytics from "./components/Analytics";
import TemperatureChart from "./components/TemperatureChart";
import HistoryTable from "./components/HistoryTable";
import AIExplanation from "./components/AIExplanation";

import { generatePDF } from "./utils/generatePDF";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "";
const API_BASE = BACKEND_URL || "/api";

function App() {

    const [temperature, setTemperature] = useState("");
    const [humidity, setHumidity] = useState("");
    const [ndvi, setNdvi] = useState("");
    const [builtup, setBuiltup] = useState("");
    const [population, setPopulation] = useState("");
    const [useLiveWeather, setUseLiveWeather] = useState(true);

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const [history, setHistory] = useState([]);

    const [location, setLocation] = useState(null);

    // Fetch Weather
    // Fetch Satellite Data
const fetchSatelliteData = async (lat, lon) => {

    try {

        const response = await fetch(
            `${API_BASE}/satellite/all?latitude=${lat}&longitude=${lon}`
        );

        if (!response.ok) {
            const text = await response.text();
            console.error("Satellite API error", response.status, response.url, text);
            return;
        }

        const data = await response.json();

        if (data?.error) {
            console.error("Satellite API returned error", data);
            return;
        }

        if (!data?.analysis || !data?.satellite_data) {
            console.error("Satellite API returned unexpected body", data);
            return;
        }

        console.log("Satellite Data:", data);

        // Temperature (Land Surface Temperature)
        setTemperature(
            data.analysis.land_surface_temperature ?? ""
        );

        // Humidity
        setHumidity(
            data.satellite_data.weather?.humidity ?? ""
        );

        // NDVI
        setNdvi(
            data.satellite_data.sentinel?.ndvi?.toFixed(2) ?? ""
        );

        // Built-up %
        if (data.satellite_data.worldcover?.land_cover === "Built-up") {
            setBuiltup(90);
        } else {
            setBuiltup(30);
        }

    } catch (error) {

        console.error("Satellite API Error:", error);

    }

};

    // Update weather when map location changes
    useEffect(() => {

    if (location) {

        fetchSatelliteData(location.lat, location.lng);

    }

}, [location]);

    // Predict Heat Risk
    const predictHeatRisk = async () => {

        setLoading(true);

        try {

            const response = await fetch(`${API_BASE}/predict`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    temperature: Number(temperature),

                    humidity: Number(humidity),

                    ndvi: Number(ndvi),

                    builtup: Number(builtup),

                    population: Number(population)

                })

            });

            const data = await response.json();

            setResult(data);

            setHistory(prev => [

                {

                    time: new Date().toLocaleTimeString(),

                    temperature,

                    humidity,

                    risk: data["Predicted Risk"]

                },

                ...prev

            ]);

        } catch (error) {

            console.error(error);

        }

        setLoading(false);

    };

    const downloadReport = () => {
        if (!result) return;

        generatePDF({
            temperature,
            humidity,
            ndvi,
            builtup,
            population,
            risk: result["Predicted Risk"],
            recommendations: result["Recommendations"] || []
        });
    };

    return (

        <>

            <Navbar />

            <div className="dashboard">

                {/* ================= ROW 1 ================= */}

                <div className="row">

                    <div className="card">

                        <MapComponent setLocation={setLocation} />

                        {location && (

                            <div style={{ marginTop: "20px" }}>

                                <h3>📍 Selected Location</h3>

                                <p>

                                    <strong>Latitude :</strong>{" "}
                                    {location.lat.toFixed(4)}

                                </p>

                                <p>

                                    <strong>Longitude :</strong>{" "}
                                    {location.lng.toFixed(4)}

                                </p>

                            </div>

                        )}

                    </div>

                    <div className="card">

                        <PredictionPanel

                            weather={{
    temperature,
    humidity,
    useLiveWeather,
    setTemperature,
    setHumidity,
    setUseLiveWeather,
  }}
  inputs={{
    ndvi,
    builtup,
    population,
    setNdvi,
    setBuiltup,
    setPopulation,
  }}
  predictRisk={predictHeatRisk}
  loading={loading}

                        />

                    </div>

                </div>

                {/* ================= ROW 2 ================= */}

                <div className="row">

                    <div className="card">

                        <PredictionCard result={result} />

                    </div>

                    <div className="card">

                        <SummaryCards
    temperature={temperature}
    humidity={humidity}
    ndvi={ndvi}
    builtup={builtup}
    population={population}
    result={result}
/>

                    </div>

                </div>

                {/* ================= AI EXPLANATION ================= */}

                <div className="card full-width">

                    <AIExplanation
                        explanation={result?.["AI Explanation"]}
                    />

                </div>

                {/* ================= ROW 3 ================= */}

                <div className="row">

                    <div className="card">

                        <Analytics history={history} />

                    </div>

                    <div className="card">

                        <TemperatureChart history={history} />

                    </div>

                </div>

                {/* ================= ROW 4 ================= */}

                <div className="card full-width">

                    <HistoryTable history={history} />

                    <button
    className="download-btn"
    onClick={downloadReport}
>
    📄 Download Report
</button>

                </div>

            </div>

            <Footer />

        </>

    );

}

export default App;