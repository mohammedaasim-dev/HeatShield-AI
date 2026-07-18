import "./SummaryCards.css";

function SummaryCards({
    temperature,
    humidity,
    ndvi,
    builtup,
    population,
    result
}) {

    const risk = result ? result["Predicted Risk"] : "--";

    return (

        <div className="summary-container">

            <div className="summary-card">
                <div className="icon">🌡</div>
                <div>
                    <h4>Temperature</h4>
                    <h2>{temperature} °C</h2>
                </div>
            </div>

            <div className="summary-card">
                <div className="icon">💧</div>
                <div>
                    <h4>Humidity</h4>
                    <h2>{humidity}%</h2>
                </div>
            </div>

            <div className="summary-card">
                <div className="icon">🌿</div>
                <div>
                    <h4>NDVI</h4>
                    <h2>{ndvi}</h2>
                </div>
            </div>

            <div className="summary-card">
                <div className="icon">🏙</div>
                <div>
                    <h4>Built-up</h4>
                    <h2>{builtup}%</h2>
                </div>
            </div>

            <div className="summary-card">
                <div className="icon">👥</div>
                <div>
                    <h4>Population</h4>
                    <h2>{population}</h2>
                </div>
            </div>

            <div className="summary-card risk">

                <div className="icon">🔥</div>

                <div>
                    <h4>Heat Risk</h4>
                    <h2>{risk}</h2>
                </div>

            </div>

        </div>

    );

}

export default SummaryCards;