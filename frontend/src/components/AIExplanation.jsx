import "./AIExplanation.css";

function AIExplanation({ explanation }) {

    if (!explanation) {
        return (
            <div className="ai-explanation-card">
                <div className="ai-explanation-header">
                    <h2>🤖 AI Explanation</h2>
                </div>

                <div className="ai-explanation-body">
                    <p>No AI explanation is available yet. Predict to generate the explanation.</p>
                </div>
            </div>
        );
    }

    const lines = explanation
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== "");

    return (
        <div className="ai-explanation-card">

            <div className="ai-explanation-header">
                <h2>🤖 AI Explanation</h2>
            </div>

            <div className="ai-explanation-body">

                {lines.map((line, index) => {

                    // Section headings
                    if (line.startsWith("##")) {
                        return (
                            <h3 key={index} className="ai-section-title">
                                {line.replace("##", "").trim()}
                            </h3>
                        );
                    }

                    // Bullet points
                    if (line.startsWith("-")) {
                        return (
                            <div key={index} className="ai-point">
                                <span className="bullet">•</span>
                                <span>{line.replace("-", "").trim()}</span>
                            </div>
                        );
                    }

                    // Normal text
                    return (
                        <p key={index} className="ai-text">
                            {line}
                        </p>
                    );

                })}

            </div>

        </div>
    );
}

export default AIExplanation;