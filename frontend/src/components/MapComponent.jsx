import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

function LocationMarker({ setLocation }) {

    const [position, setPosition] = useState(null);

    useMapEvents({
        click(e) {

            setPosition(e.latlng);

            setLocation({
                lat: e.latlng.lat,
                lng: e.latlng.lng
            });

        },
    });

    return position === null ? null : (

        <Marker position={position}>

            <Popup>

                Latitude: {position.lat.toFixed(4)}

                <br />

                Longitude: {position.lng.toFixed(4)}

                style={{ padding: "5px" }}

            </Popup>

        </Marker>

    );

}

function MapComponent({ setLocation }) {

    return (

        <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{
                height: "420px",
                width: "100%",
                borderRadius: "15px",
                marginTop: "20px"
            }}
        >

            <TileLayer
                attribution="© OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationMarker setLocation={setLocation} />

        </MapContainer>

    );

}

export default MapComponent;