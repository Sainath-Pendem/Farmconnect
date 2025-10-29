

import React from 'react';
import MapComponent from './MapComponent';

const TrackOrder = () => {
  const orderLocation = {
    lat: 17.3865,
    lng: 78.4898,
  };

  return (
    <div>
      <h2>Track Order</h2>
      <MapComponent location={orderLocation} />
    </div>
  );
};

export default TrackOrder;
