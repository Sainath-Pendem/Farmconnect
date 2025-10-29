import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useUserContext } from '../Context/UserContext';

const NotificationManager = () => {
  const { user, role, showFarmerNotification, setNotifications } = useUserContext();
  const lastSeenId = useRef(null);
  const farmerIdRef = useRef(null);
  const intervalRef = useRef(null);
  const [ready, setReady] = useState(false);

  const email = user.email?.email || user?.email;

  useEffect(() => {
    const fetchFarmerId = async () => {
      const token = Cookies.get('token');
      if (!token || !email || role !== 'Farmer') return;

      try {
        const res = await axios.get(`http://localhost:8080/farmer/${email}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data?.id) {
          farmerIdRef.current = res.data.id;
          setReady(true);
        }
      } catch (err) {
        console.error('Error fetching farmer ID:', err);
      }
    };

    if (!farmerIdRef.current) {
      fetchFarmerId();
    }
  }, [email, role]);

  // Fetch notifications periodically
  useEffect(() => {
    if (!ready || role !== 'Farmer') return;

    const fetchNotifications = async () => {
      const token = Cookies.get('token');
      const f_id = farmerIdRef.current;
      if (!token || !f_id) return;

      try {
        const notifRes = await axios.get(`http://localhost:8080/notify/farmer/${f_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = notifRes.data || [];
        setNotifications(data);

        const latest = data[data.length - 1];
        if (latest.n_id !== lastSeenId.current) {
          showFarmerNotification(latest.message || latest.description || '');
          lastSeenId.current = latest.n_id;
        }
      } catch (err) {
        console.error('Farmer notification error:', err);
      }
    };

    fetchNotifications();
    intervalRef.current = setInterval(fetchNotifications, 15000); 

    return () => clearInterval(intervalRef.current);
  }, [ready, role]);

  return null;
};

export default NotificationManager;
