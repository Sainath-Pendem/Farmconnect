import React, { useContext, useEffect, useState } from 'react';
import './Notification.css';
import { useUserContext } from '../Context/UserContext';
import UserContext from '../Context/UserContext';
import axios from 'axios';
import Cookies from 'js-cookie';

const Notification = () => {
  const { notifications } = useUserContext();
  const { user } = useContext(UserContext);
  const [buyerDetails, setBuyerDetails] = useState({});

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token || notifications.length === 0) return;

    const uniqueBids = [...new Set(
      notifications.map(n => n.b_id).filter(b_id => !!b_id)
    )];

    uniqueBids.forEach(async (b_id) => {
      if (!buyerDetails[b_id]) {
        try {
          const res = await axios.get(`http://localhost:8080/buyer/id/${b_id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setBuyerDetails(prev => ({ ...prev, [b_id]: res.data }));
        } catch (err) {
          console.warn(`Failed to fetch buyer ${b_id}:`, err);
        }
      }
    });
  }, [notifications]);

  if (!user) return null;

  return (
    <div className="notification-center">
      <h4>🔔 Notifications</h4>
      <div className="card-container">
        {notifications.length === 0 ? (
          <div className="notification-card">You're all caught up!</div>
        ) : (
          notifications.map((notif, idx) => {
            const buyer = buyerDetails[notif.b_id] || {};
            return (
              <div key={idx} className="notification-card">
                <p><strong>📅 Time:</strong> {new Date(notif.createdAt).toLocaleString()}</p>
                <p><strong>👤 Buyer:</strong> {buyer.firstname || 'Unknown'} {buyer.lastname || ''}</p>
                <p>{notif.message || notif.description || "🔔 Notification received"}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notification;
