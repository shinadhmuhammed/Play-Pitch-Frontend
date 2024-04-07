import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';

type LatLngLiteral = {
  lat: number;
  lng: number;
};

type TurfLocationProps = {
  setSelectedLocation: React.Dispatch<React.SetStateAction<LatLngLiteral>>;
};

const TurfLocation: React.FC<TurfLocationProps> = ({ setSelectedLocation }) => {
  const [selectedMarkerPosition, setSelectedMarkerPosition] = useState<LatLngLiteral | null>(null);

  const mapOptions = {
    zoom: 10,
    center: { lat: 12.9716, lng: 77.5946 } 
  };
  
  const apiKey = 'AIzaSyCPqPnBZ33jk1vGyNiCHToX9W9edkqlmls'; 

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    setSelectedMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  };

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
    >
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        zoom={mapOptions.zoom}
        center={mapOptions.center}
        onClick={handleMapClick}
      >
        {selectedMarkerPosition && (
          <Marker position={selectedMarkerPosition}>
            <InfoWindow position={selectedMarkerPosition}>
              <div>
                <h3>Selected Location</h3>
                <p>Latitude: {selectedMarkerPosition.lat}</p>
                <p>Longitude: {selectedMarkerPosition.lng}</p>
              </div>
            </InfoWindow>
          </Marker>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default TurfLocation;
