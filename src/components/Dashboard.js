import React from 'react';
import './Dashboard1.css'; // Reuse the same CSS
import { useNavigate} from 'react-router-dom';

const FarmerDashboard1 = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/farmerprofile");
  };

  const gotocarts=()=>{
    navigate("/carts");
  }

  const gotonotifications=()=>{
    navigate("/notifications");
  }

  const gotoorders=()=>{
    navigate("/vieworders");
  }

  return (
    <>


    <div className="dashboard-container">
      <h2 className="dashboard-heading">Farmer Dashboard</h2>
      <div className="dashboard-cards row">
        <div className="col-md-3 dashboard-card" onClick={goToProfile}>
          <div className="card text-center">
            <div className="card-body">
              <h3 className="emoji">👨‍🌾</h3>
              <h5 className="card-title">Profile</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 dashboard-card" onClick={gotocarts}>
          <div className="card text-center">
            <div className="card-body">
              <h3 className="emoji">🧺</h3>
              <h5 className="card-title">Manage Products</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 dashboard-card" onClick={gotoorders}>
          <div className="card text-center">
            <div className="card-body">
              <h3 className="emoji">📦</h3>
              <h5 className="card-title">View Orders</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 dashboard-card" onClick={gotonotifications}>
          <div className="card text-center">
            <div className="card-body">
              <h3 className="emoji">🔔</h3>
              <h5 className="card-title">Notifications</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FarmerDashboard1;
