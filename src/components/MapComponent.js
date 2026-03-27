import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 17.385044,  
  lng: 78.486671,  
};

function MapComponent({ location = center }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "", 
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={12}>
      <Marker position={location} />
    </GoogleMap>
  );
}

export default React.memo(MapComponent);
