import "./Analytics.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function Analytics({ history }) {

    const low = history.filter(item => item.risk === "Low").length;
    const medium = history.filter(item => item.risk === "Medium").length;
    const high = history.filter(item => item.risk === "High").length;

    const data = [
        { name: "Low", value: low, color: "#22C55E" },
        { name: "Medium", value: medium, color: "#F59E0B" },
        { name: "High", value: high, color: "#EF4444" }
    ];

    return (

        <div className="analytics-card">

            <div className="analytics-header">

                <h2>📊 Risk Distribution</h2>

                <span>{history.length} Predictions</span>

            </div>

            <ResponsiveContainer width="100%" height={300}>

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={95}
                    >

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={entry.color}
                            />

                        ))}

                    </Pie>

                    <Tooltip />

                </PieChart>

            </ResponsiveContainer>

            <div className="analytics-legend">

                <div className="legend-item">
                    <span className="legend low"></span>
                    Low ({low})
                </div>

                <div className="legend-item">
                    <span className="legend medium"></span>
                    Medium ({medium})
                </div>

                <div className="legend-item">
                    <span className="legend high"></span>
                    High ({high})
                </div>

            </div>

        </div>

    );

}

export default Analytics;