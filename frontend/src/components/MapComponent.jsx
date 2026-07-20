import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents
} from "react-leaflet";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const greenIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    className: "green-marker"
});

const yellowIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    className: "yellow-marker"
});

const redIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    className: "red-marker"
});

function LocationMarker({ setLocation }) {

    const [position, setPosition] = useState(null);

    useMapEvents({
        click(e) {

            setPosition(e.latlng);

            setLocation({
                lat: e.latlng.lat,
                lng: e.latlng.lng
            });

        }
    });

    return position ? (
        <Marker position={position}>
            <Popup>
                Selected Location
                <br />
                {position.lat.toFixed(4)},
                {position.lng.toFixed(4)}
            </Popup>
        </Marker>
    ) : null;
}

function MapComponent({ setLocation }) {

    const [heatPoints, setHeatPoints] = useState([]);

    useEffect(() => {

        if (!setLocation) return;

    }, []);

    const fetchHeatMap = async (lat, lon) => {

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/heatmap?latitude=${lat}&longitude=${lon}`
            );

            const data = await response.json();

            setHeatPoints(data);

        } catch (error) {

            console.error(error);

        }

    };

    function ClickHandler() {

        useMapEvents({

            click(e) {

                setLocation({
                    lat: e.latlng.lat,
                    lng: e.latlng.lng
                });

                fetchHeatMap(
                    e.latlng.lat,
                    e.latlng.lng
                );

            }

        });

        return null;
    }

    return (

        <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{
                height: "450px",
                width: "100%",
                borderRadius: "15px"
            }}
        >

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationMarker setLocation={setLocation} />

            <ClickHandler />

            {heatPoints.map((point, index) => {

                let icon = greenIcon;

                if (point.risk === "Medium")
                    icon = yellowIcon;

                if (point.risk === "High")
                    icon = redIcon;

                return (

                    <Marker
                        key={index}
                        position={[point.latitude, point.longitude]}
                        icon={icon}
                    >

                        <Popup>

                            <b>Heat Score</b>

                            <br />

                            {point.score}

                            <br /><br />

                            <b>Risk</b>

                            <br />

                            {point.risk}

                            <br /><br />

                            <b>Drivers</b>

                            <ul>

                                {point.drivers.map((driver, i) => (
                                    <li key={i}>{driver}</li>
                                ))}

                            </ul>

                            <b>Recommendation</b>

                            <br />

                            {point.recommendation}

                        </Popup>

                    </Marker>

                );

            })}

        </MapContainer>

    );

}

export default MapComponent;