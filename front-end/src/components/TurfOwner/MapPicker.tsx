/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

function MapPicker({ onSelectLocation }: { onSelectLocation: (latlng: L.LatLng) => void }) {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);


  const handleClick = (e: LeafletMouseEvent) => {
    setPosition([e.latlng.lat, e.latlng.lng]);
    onSelectLocation(e.latlng);
  };

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
      // @ts-expect-error
      onClick={handleClick} 
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Your turf location</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapPicker;
