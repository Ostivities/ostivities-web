import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';

interface MapProps {
  onSelectAddress: (address: string) => void;
}

const Map: React.FC<MapProps> = ({ onSelectAddress }) => {
  const [position, setPosition] = useState<LatLngExpression | null>(null);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const address = `Lat: ${lat}, Lng: ${lng}`; // Format address as needed
        setPosition([lat, lng]);
        onSelectAddress(address); // Pass the address to the parent component
      },
    });
    return null;
  };

  return (
    <MapContainer center={[51.505, -0.09] as LatLngExpression} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents />
      {position && (
        <Marker position={position}>
          <Popup>
            Selected Position: {position.toString()}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
