import React, { useEffect } from 'react';
import './NotificationPopover.css';
import { useUserContext } from '../Context/UserContext';

const BuyerNotificationPopover = () => {
  const { buyerPopupNotification, showBuyerNotification } = useUserContext();

  useEffect(() => {
    if (buyerPopupNotification) {
      const timer = setTimeout(() => {
        showBuyerNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [buyerPopupNotification, showBuyerNotification]);

  if (!buyerPopupNotification) return null;

  return (
    <div className="notification-popover">
      <div className="notification-content">
        🛒 {buyerPopupNotification}
      </div>
    </div>
  );
};

export default BuyerNotificationPopover;
