import "./TemperatureChart.css";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

function TemperatureChart({ history }) {

    if (history.length === 0) {
        return (
            <div className="temp-chart-card">

                <h2>📈 Temperature Trend</h2>

                <div className="no-data">
                    No prediction history available.
                </div>

            </div>
        );
    }

    return (

        <div className="temp-chart-card">

            <div className="chart-header">

                <h2>📈 Temperature Trend</h2>

                <span>Last {history.length} Predictions</span>

            </div>

            <ResponsiveContainer width="100%" height={320}>

                <LineChart data={history}>

                    <CartesianGrid
                        stroke="#334155"
                        strokeDasharray="4 4"
                    />

                    <XAxis
                        dataKey="time"
                        stroke="#CBD5E1"
                    />

                    <YAxis
                        stroke="#CBD5E1"
                    />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default TemperatureChart;