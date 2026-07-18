import "./PredictionCard.css";

function PredictionCard({ result }) {

    const hasResult = Boolean(result);
    const risk = hasResult ? result["Predicted Risk"] : null;

    let riskClass = "default";
    let emoji = "🌡️";
    let message = "Enter the inputs and click Predict to view heat risk details.";

    if (risk === "Low") {
        riskClass = "low";
        emoji = "🟢";
        message = "Low heat risk. Current conditions are generally safe.";
    }

    if (risk === "Medium") {
        riskClass = "medium";
        emoji = "🟡";
        message = "Moderate heat risk. Stay hydrated and avoid prolonged exposure.";
    }

    if (risk === "High") {
        riskClass = "high";
        emoji = "🔴";
        message = "High heat risk detected. Take precautions immediately.";
    }

    const recommendations = result?.Recommendations || [];

    return (

        <div className="prediction-card">

            <div className={`prediction-header ${riskClass}`}>

                <h2>🚨 Heat Risk Prediction</h2>

            </div>

            <div className="risk-container">

                <div className={`risk-circle ${riskClass}`}>

                    <h1>{emoji}</h1>

                    <h2>{risk || "Awaiting"}</h2>

                </div>

                <p className="risk-message">
                    {message}
                </p>

            </div>


            <div className="recommendation-list">

                {recommendations.length > 0 ? (
                    recommendations.map((item, index) => (
                        <div className="recommendation-card" key={index}>
                            <span>✔</span>
                            <p>{item}</p>
                        </div>
                    ))
                ) : (
                    <p className="recommendation-empty">
                        No recommendations yet. Predict to see suggestions.
                    </p>
                )}

            </div>

        </div>

    );

}

export default PredictionCard;