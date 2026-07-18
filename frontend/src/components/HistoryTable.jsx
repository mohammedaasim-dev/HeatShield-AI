import "./HistoryTable.css";

function HistoryTable({ history }) {

    if (history.length === 0) {
        return (
            <div className="history-card">
                <h2>📜 Prediction History</h2>

                <div className="empty-history">
                    No predictions yet.
                </div>
            </div>
        );
    }

    return (

        <div className="history-card">

            <div className="history-header">

                <h2>📜 Prediction History</h2>

                <span>{history.length} Records</span>

            </div>

            <div className="table-container">

                <table>

                    <thead>

                        <tr>
                            <th>#</th>
                            <th>Time</th>
                            <th>Temp</th>
                            <th>Humidity</th>
                            <th>Risk</th>
                        </tr>

                    </thead>

                    <tbody>

                        {history.map((item,index)=>(

                            <tr key={index}>

                                <td>{index+1}</td>

                                <td>{item.time}</td>

                                <td>{item.temperature}°C</td>

                                <td>{item.humidity}%</td>

                                <td>

                                    <span className={`risk-badge ${item.risk.toLowerCase()}`}>

                                        {item.risk}

                                    </span>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default HistoryTable;