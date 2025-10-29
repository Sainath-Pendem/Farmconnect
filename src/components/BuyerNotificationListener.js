import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useUserContext } from '../Context/UserContext';

const BuyerNotificationListener = () => {
  const { user, role,showBuyerNotification } = useUserContext();
  const lastSeenId = useRef(null);
  const buyerIdRef = useRef(null);
  const [ready, setReady] = useState(false);

  const email = user.email?.email || user?.email;

  useEffect(() => {
    const fetchBuyerId = async () => {
      const token = Cookies.get('token');
      if (!token || !email || role !== 'Buyer') return;

      try {
        const res = await axios.get(`http://localhost:8080/buyer/${email}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data?.b_id) {
          buyerIdRef.current = res.data.b_id;
          setReady(true);
        }
      } catch (err) {
        console.error('Error fetching buyer ID:', err);
      }
    };

    if (!buyerIdRef.current) {
      fetchBuyerId();
    } else {
      setReady(true);
    }
  }, [user, role, email]);

  useEffect(() => {
    if (!ready || role !== 'Buyer') return;

    const fetchNotifications = async () => {
      const token = Cookies.get('token');
      const b_id = buyerIdRef.current;
      if (!token || !b_id) return;

      try {
        const notifRes = await axios.get(`http://localhost:8080/notif/${b_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const notifications = notifRes.data || [];
        const latest = notifications[notifications.length - 1];
        if (latest?.no_id && latest.no_id !== lastSeenId.current) {
          showBuyerNotification(latest.message || `Order ${latest.o_id} ${latest.status}`);
          lastSeenId.current = latest.no_id;
        }
      } catch (err) {
        console.error("Buyer notification fetch failed:", err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); 
    return () => clearInterval(interval);
  }, [ready, role, showBuyerNotification]);

  return null;
};

export default BuyerNotificationListener;
