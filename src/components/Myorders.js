import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import UserContext from '../Context/UserContext';
import './MyOrders.css'; 

const Myorders = () => {
  const navigate=useNavigate();
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext);
  const email = user.email?.email || user?.email;

  useEffect(() => {
    const fetchOrders = async () => {
      const token = Cookies.get('token');
      if (!token || !email) return;

      try {
        const buyerRes = await axios.get(`http://localhost:8080/buyer/${email}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const b_id = buyerRes.data.b_id;

        const ordersRes = await axios.get(`http://localhost:8080/order/myorders/${b_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setOrders(ordersRes.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [email]);

  return (
    <div className="order-center">
      <h4>📦 My Orders</h4>
      <div className="card-container mx-4 my-3">
        {orders.length === 0 ? (
          <div className="order-card">You have not placed any orders yet.</div>
        ) : (
          orders.map((order, idx) => (
            <div key={idx} className="order-card">
              {/* <p><strong>🆔 Order ID:</strong> {order.o_id}</p> */}
              <p><strong>🌾 Product:</strong> {order.p_name}</p>
              <p><strong>📦 Quantity:</strong> {order.quantity}</p>
              <p><strong>💰 Total Price:</strong> ₹{order.totalcost}</p>
              <p><strong>💳 Payment Mode:</strong> {order.payment}</p>
              {/* <p><strong>📌 Status:</strong> <span className={`status-${order.status}`}>{order.status}</span></p> */}
              <div>
                <button type="button" className='btn btn-success' onClick={() => navigate(`/track/${order.o_id}`)}>📌Track Order</button>
                </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Myorders;
