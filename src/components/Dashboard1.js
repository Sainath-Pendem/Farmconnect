import React from 'react'
import './Dashboard1.css';
import { useNavigate } from 'react-router-dom';

const Dashboard1 = () => {

  const navigate=useNavigate();
  
  const placeorder=()=>{
    navigate("/market");
  }
  const profile=()=>{
    navigate("/buyerprofile");
  }

  const handlenotif=()=>{
    navigate("/notif");
  }

  const handleorder=()=>{
    navigate("/myorders");
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Buyer Dashboard</h2>
      <div className="dashboard-cards row">
        <div className="col-md-3 dashboard-card" onClick={profile}>
          <div className="card text-center">
            <div className="card-body">
              <h3 className="emoji">👤</h3>
              <h5 className="card-title">Profile</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 dashboard-card" onClick={placeorder}>
          <div className="card text-center">
            <div className="card-body">
              <h3 className="emoji">🛒</h3>
              <h5 className="card-title">Place Order</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 dashboard-card" onClick={handleorder}>
          <div className="card text-center">
            <div className="card-body">
              <h3 className="emoji">📜</h3>
              <h5 className="card-title">Order History</h5>
            </div>
          </div>
        </div>


        <div className="col-md-3 dashboard-card" onClick={handlenotif}>
          <div className="card text-center">
            <div className="card-body">
              <h3 className="emoji">🔔</h3>
              <h5 className="card-title">Notifications</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard1;
