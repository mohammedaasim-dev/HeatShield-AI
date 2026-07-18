import "./PredictionPanel.css";

function PredictionPanel({
    weather,
    inputs,
    predictRisk,
    loading
}) {

    const {
        temperature,
        setTemperature,
        humidity,
        setHumidity,
        useLiveWeather,
        setUseLiveWeather
    } = weather;

    const {
        ndvi,
        setNdvi,
        builtup,
        setBuiltup,
        population,
        setPopulation
    } = inputs;

    return (

        <div className="prediction-panel">

            <div className="panel-header">
                <h2>🌤 Prediction Panel</h2>

                <div className="live-toggle">

                    <input
                        type="checkbox"
                        checked={useLiveWeather}
                        onChange={(e)=>setUseLiveWeather(e.target.checked)}
                    />

                    <span>Use Live Weather</span>

                </div>

            </div>

            <div className="input-section">

                <label>🌡 Temperature (°C)</label>

                <input
                    type="number"
                    value={temperature}
                    onChange={(e)=>setTemperature(e.target.value)}
                />

                <label>💧 Humidity (%)</label>

                <input
                    type="number"
                    value={humidity}
                    onChange={(e)=>setHumidity(e.target.value)}
                />

                <label>🌿 NDVI (Normalized Difference Vegetation Index) </label>

                <input
                    type="number"
                    step="0.01"
                    value={ndvi}
                    onChange={(e)=>setNdvi(e.target.value)}
                />

                <label>🏙 Built-up Area (%)</label>

                <input
                    type="number"
                    value={builtup}
                    onChange={(e)=>setBuiltup(e.target.value)}
                />

                <label>👥 Population</label>

                <input
                    type="number"
                    value={population}
                    onChange={(e)=>setPopulation(e.target.value)}
                />

            </div>

            <button
    className="predict-btn"
    onClick={predictRisk}
    disabled={loading}
>
    {loading ? (
        <>
            <span className="button-loader"></span>
            <span className="loading-text">
                AI is Analyzing...
            </span>
        </>
    ) : (
        "🔥 Predict Heat Risk"
    )}
</button>

        </div>

    );

}

export default PredictionPanel;