import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import UserContext from '../Context/UserContext';
import './Notif.css';

const Notif = () => {
  const [notification, setnotification] = useState([]);
  const { user } = useContext(UserContext);
  const email = user.email;

  useEffect(() => {
    const fetchBuyerNotif = async () => {
      const token = Cookies.get('token');
      if (!token || !email) return;

      try {
        const buyerRes = await axios.get(`http://localhost:8080/buyer/${email}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const b_id = buyerRes.data?.b_id;
        if (!b_id) return;

        const notifRes = await axios.get(`http://localhost:8080/notif/${b_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setnotification(notifRes.data || []);
      } catch (err) {
        console.error('Error fetching notification:', err);
      }
    };

    fetchBuyerNotif();
   
  }, [email]);

  return (
    <div className="notif-container">
      <h4>🔔 notification</h4>
      {notification.length === 0 ? (
        <p>No notification found</p>
      ) : (
        <ul className="notif-list">
          {notification.map((notif, index) => (
            <li key={`${notif.no_id}-${index}`} className={`notif-item ${notif.status}`}>
              {notif.message || `Order ${notif.o_id} was ${notif.status}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notif;
