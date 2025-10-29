import { useContext, useEffect, useState } from 'react';
import UserContext from '../Context/UserContext';
import './ViewCart.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const ViewCart = () => {
  const { cartitems, setCartitems, removefromcart } = useContext(UserContext);
  const { user, role } = useContext(UserContext);

  const [quantities, setQuantities] = useState({});
  const [profileData, setProfileData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:8080/${role.toLowerCase()}/${user.email}`, {
        withCredentials: true,
      })
        .then((res) => setProfileData(res.data))
        .catch((err) => console.error("Failed to load profile:", err));
    }
  }, [user, role]);

  const handleq = (e, itemId) => {
    setQuantities({ ...quantities, [itemId]: e.target.value });
  };

  const order = async () => {
    const token = Cookies.get('token');
    if (!token) {
      alert('You are not logged in!');
      return;
    }

    try {
      const orderData = cartitems.map((item) => ({
        p_id: item.p_id,
        p_name: item.name,
        quantity: quantities[item.p_id],
        totalcost: item.price * quantities[item.p_id],
        b_id: profileData?.b_id,
        id: item.farmer.id,
        payment: paymentMethod,
      }));

      if (paymentMethod === "Cash On Delivery") {
        await axios.post('http://localhost:8080/order/checkout', orderData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCartitems([]);
        setShowToast(true);
      } else if (paymentMethod === "UPI/Debit Card") {
        const totalAmount = cartitems.reduce((total, item) => {
          const qty = quantities[item.p_id] || 0;
          return total + (item.price * qty) + ((item.price * qty) * 0.18);
        }, 0);

        const { data: razorOrder } = await axios.post(
          "http://localhost:8080/api/payment/create-order",
          { amount: Math.round(totalAmount) },
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );

        const options = {
          key: "rzp_test_1fBToENlsuvgct", // Razorpay key_id
          amount: razorOrder.amount,
          currency: razorOrder.currency,
          name: "Farm Connect",
          description: "Farm Product Purchase",
          order_id: razorOrder.id,
          handler: async function (response) {
            await axios.post('http://localhost:8080/order/checkout', orderData, {
              headers: { Authorization: `Bearer ${token}` },
            });

            setCartitems([]);
            setShowToast(true);
          },
          prefill: {
            email: user.email || "customer@example.com",
          },
          theme: { color: "#0f9d58" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Please select a payment method.");
      }
    } catch (err) {
      console.error(err);
      alert("Error processing order or payment");
    }
  };





  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      {cartitems.length === 0 ? (
        <p className="cart-empty">Cart is empty</p>
      ) : (
        cartitems.map((item) => (
          <div className="cart-item" key={item.p_id}>
            <div className="cart-item-info">
              <span className="cart-item-name"><strong>{item.name}</strong></span>
              <span className="cart-item-price">₹{item.price} per kg</span>
              <span className="cart-item-price">Total Quantity: {item.quantity} kgs</span>
              <span className="cart-item-price">
                <input
                  className="quantity"
                  type="number"
                  value={quantities[item.p_id] || ''}
                  onChange={(e) => handleq(e, item.p_id)}
                  placeholder="Required quantity"
                  min="1"
                  max={item.quantity}
                /> ( in kgs )
              </span>
              <span className="cart-item-price">
                <strong>Total Cost(inclusive taxes...):</strong> ₹{((item.price * quantities[item.p_id]) + ((item.price * quantities[item.p_id]) * 18 / 100) || 0)}
              </span>
            </div>
            <button className="remove-btn" onClick={() => removefromcart(item.p_id)}>
              Remove
            </button>
          </div>
        ))
      )}

      {cartitems.length !== 0 && (
        <div className='d-flex justify-content-between'>
          <select
            className="form-select my-3"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="" disabled>Select Payment Method</option>
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="UPI/Debit Card">UPI/Debit Card</option>
          </select>
          <button className="btn btn-success my-3" onClick={order}>
            Checkout
          </button>
        </div>
      )}

      {showToast && (
        <div className="toast-container position-relative top-0 end-0 p-3" style={{ zIndex: 1055 }}>
          <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-body">
              Order placed successfully!
              <div className="mt-2 pt-2 border-top">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowToast(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCart;
