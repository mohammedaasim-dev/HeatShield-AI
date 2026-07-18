import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = ({
    location,
    temperature,
    humidity,
    ndvi,
    builtup,
    population,
    result,
    history
}) => {

    const doc = new jsPDF();

    // ===== Title =====
    doc.setFontSize(24);
    doc.setTextColor(37, 99, 235);
    doc.text("HeatShield AI", 105, 20, { align: "center" });

    doc.setFontSize(13);
    doc.setTextColor(100);
    doc.text(
        "Urban Heat Risk Prediction Report",
        105,
        30,
        { align: "center" }
    );

    // ===== Date =====
    doc.setFontSize(11);
    doc.text(
        `Generated: ${new Date().toLocaleString()}`,
        14,
        42
    );

    // ===== Location =====
    doc.setFontSize(15);
    doc.text("Location", 14, 55);

    doc.setFontSize(11);

    doc.text(
        `Latitude : ${location?.lat?.toFixed(4) || "-"}`,
        20,
        63
    );

    doc.text(
        `Longitude : ${location?.lng?.toFixed(4) || "-"}`,
        20,
        70
    );

    // ===== Environmental Data =====
    doc.setFontSize(15);
    doc.text("Environmental Data", 14, 85);

    autoTable(doc, {

        startY: 90,

        head: [["Parameter", "Value"]],

        body: [

            ["Temperature", `${temperature} °C`],

            ["Humidity", `${humidity} %`],

            ["NDVI", ndvi],

            ["Built-up Area", `${builtup}%`],

            ["Population", population]

        ]

    });

    // ===== Prediction =====
    let y = doc.lastAutoTable.finalY + 15;

    doc.setFontSize(15);

    doc.text("Prediction", 14, y);

    y += 10;

    doc.setFontSize(12);

    doc.text(
        `Predicted Risk : ${result?.["Predicted Risk"] || "-"}`,
        20,
        y
    );

    // ===== Recommendations =====
    y += 15;

    doc.setFontSize(15);

    doc.text("Recommendations", 14, y);

    y += 8;

    result?.Recommendations?.forEach((item) => {

        doc.setFontSize(11);

        doc.text(`• ${item}`, 20, y);

        y += 7;

    });

    // ===== History =====

    autoTable(doc, {

        startY: y + 8,

        head: [["Time", "Temp", "Humidity", "Risk"]],

        body: history.map(item => [

            item.time,

            `${item.temperature}°C`,

            `${item.humidity}%`,

            item.risk

        ])

    });

    doc.save("HeatShieldAI_Report.pdf");

};