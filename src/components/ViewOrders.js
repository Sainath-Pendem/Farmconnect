import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import UserContext from '../Context/UserContext';
import { useUserContext } from '../Context/UserContext';
import './ViewOrders.css';

const ViewOrders = () => {
  const [farmerId, setFarmerId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [buyerDetails, setBuyerDetails] = useState({});
  const { user } = useContext(UserContext);
  const { showFarmerNotification ,showBuyerNotification} = useUserContext();

  const email = user?.email?.email || user?.email;

  const updateOrderStatus = (o_id, status) => {
    setOrders(prev =>
      prev.map(order => order.o_id === o_id ? { ...order, status } : order)
    );
  };

  const handleaccept = async (o_id) => {
    const token = Cookies.get('token');
    if (!token) return;

    const order = orders.find(o => o.o_id === o_id);
    if (!order) return;

    try {
      await axios.put(
        `http://localhost:8080/order/status/${o_id}`,
        "accepted",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      await axios.post("http://localhost:8080/notif/add", {
        id: farmerId,
        o_id,
        b_id: order.b_id,
        message: `Your order has been accepted.`,
        status: 'accepted'
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      updateOrderStatus(o_id, "accepted");
      showFarmerNotification("✅ Order accepted & buyer will be notified.");
      showBuyerNotification("✅ Order accepted");
    } catch (err) {
      console.error("Accept error:", err);
      showFarmerNotification("❌ Failed to accept order.");
    }
  };

  const handledecline = async (o_id) => {
    const token = Cookies.get('token');
    if (!token) return;

    const order = orders.find(o => o.o_id === o_id);
    if (!order) return;

    try {
      const res = await axios.delete(`http://localhost:8080/order/delete/${o_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 200) {
        await axios.post("http://localhost:8080/notif/add", {
          id: farmerId,
          o_id,
          b_id: order.b_id,
          message: `Your order has been declined.`,
          status: "declined"
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        updateOrderStatus(o_id, "declined");
        showFarmerNotification("❌ Order declined & buyer will be notified.");
        showBuyerNotification("❌ Order declined ");
      } else {
        showFarmerNotification("⚠️ Could not decline the order.");
      }
    } catch (err) {
      console.error("Decline error:", err);
      showFarmerNotification("❌ Failed to decline order.");
    }
  };

  // Fetch Farmer ID
  useEffect(() => {
    const fetchFarmerId = async () => {
      const token = Cookies.get('token');
      if (!token || !email) return;

      try {
        const res = await axios.get(`http://localhost:8080/farmer/${email}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data?.id) setFarmerId(res.data.id);
      } catch (err) {
        console.error("Farmer ID error:", err);
      }
    };

    fetchFarmerId();
  }, [email]);

  // Fetch Orders
  useEffect(() => {
    if (!farmerId) return;

    const fetchOrders = async () => {
      const token = Cookies.get('token');
      if (!token) return;

      try {
        const res = await axios.get(`http://localhost:8080/order/farmer/${farmerId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data || []);
      } catch (err) {
        console.error("Orders error:", err);
      }
    };

    fetchOrders();
  }, [farmerId]);

  // Fetch Buyer Details
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token || orders.length === 0) return;

    const uniqueBuyerIds = [...new Set(
      orders.map(order => order.b_id).filter(Boolean)
    )];

    uniqueBuyerIds.forEach(async (b_id) => {
      if (!buyerDetails[b_id]) {
        try {
          const res = await axios.get(`http://localhost:8080/buyer/id/${b_id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setBuyerDetails(prev => ({ ...prev, [b_id]: res.data }));
        } catch (err) {
          console.warn(`Buyer ${b_id} error:`, err);
        }
      }
    });
  }, [orders]);

  if (!user || !farmerId) return null;

  return (
    <div className="order-center">
      <h4>🧾 Your Orders</h4>
      <div className="card-container mx-4 my-3">
        {orders.length === 0 ? (
          <div className="order-card">No orders placed yet.</div>
        ) : (
          orders.map((order, idx) => {
            const buyer = buyerDetails[order.b_id] || {};
            return (
              <div key={idx} className="order-card">
                <p><strong>🆔 Order ID:</strong> {order.o_id}</p>
                <p><strong>📦 Product:</strong> {order.p_name || 'N/A'}</p>
                <p><strong>👤 Buyer:</strong> {buyer.firstname || 'Unknown'} {buyer.lastname || ''}</p>
                <p><strong>📍 Address:</strong> {buyer.address || ''}, {buyer.city || ''}</p>
                <p><strong>📦 Quantity:</strong> {order.quantity}</p>
                <p><strong>💰 Total Price:</strong> ₹{order.totalcost}</p>
                <p><strong>💳 Payment:</strong> {order.payment || 'N/A'}</p>

                {order.status === 'declined' ? (
                  <p className="text-danger fw-bold">You declined this order</p>
                ) : order.status === 'accepted' ? (
                  <p className="text-success fw-bold">You accepted this order</p>
                ) : (
                  <>
                    <button
                      className='btn btn-success mx-3'
                      onClick={() => handleaccept(order.o_id)}
                    >
                      Accept
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => handledecline(order.o_id)}
                    >
                      Decline
                    </button>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ViewOrders;
