import React, { useEffect } from 'react';
import './NotificationPopover.css';
import { useUserContext } from '../Context/UserContext';

const FarmerNotificationPopover = () => {
  const { farmerPopupNotification, showFarmerNotification } = useUserContext();

  useEffect(() => {
    if (farmerPopupNotification) {
      const timer = setTimeout(() => {
        showFarmerNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [farmerPopupNotification, showFarmerNotification]);

  if (!farmerPopupNotification) return null;

  return (
    <div className="notification-popover">
      <div className="notification-content">
        👨‍🌾 {farmerPopupNotification}
      </div>
    </div>
  );
};

export default FarmerNotificationPopover;
