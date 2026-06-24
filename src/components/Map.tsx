import { MapContainer, TileLayer, Marker, Circle, useMapEvents } from "react-leaflet";
import { LatLngLiteral } from "leaflet";
import type React from "react";

interface Geofence {
  lat: number;
  lng: number;
  radius: number;
}

interface MapProps {
  center?: LatLngLiteral | null;
  setCenter?: React.Dispatch<React.SetStateAction<LatLngLiteral | null>>;
  geofence?: Geofence | null;
}

function LocationPicker({
  setCenter,
}: {
  setCenter: React.Dispatch<React.SetStateAction<LatLngLiteral | null>>;
}) {
  useMapEvents({
    click(e) {
      setCenter(e.latlng);
    },
  });
  return null;
}

export default function Map({ center, setCenter, geofence }: MapProps) {
  return (
    <MapContainer
      center={center || { lat: 20, lng: 78 }}
      zoom={13}
      style={{ height: "600px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {setCenter && <LocationPicker setCenter={setCenter} />}

      {center && <Marker position={center} />}

      {geofence && (
        <Circle
          center={{ lat: geofence.lat, lng: geofence.lng }}
          radius={geofence.radius}
        />
      )}
    </MapContainer>
  );
}
