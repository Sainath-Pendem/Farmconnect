import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import About from './components/About';
import Home from './components/Home';
import Navbar from './components/NavBar';
import CropAdvisory from './components/CropAdvisory';
import Login from './components/Login';
import User from './components/User';
import User1 from './components/User1';
import SignUp from './components/SignUp';
import SignUp1 from './components/SignUp1';
import Dashboard from './components/Dashboard';
import Dashboard1 from './components/Dashboard1';
import Profile from './components/Profile';
import Carts from './components/Carts';
import AddProduct from './components/AddProduct';
import UserContext from './Context/UserContext';
import ViewOrders from './components/ViewOrders';
import Market from './components/Market';
import ViewCart from './components/ViewCart';
import Myorders from './components/Myorders';
import Notification from './components/Notification';
import Notif from './components/Notif';
import NotificationPopover from './components/Notificationpopover';
import BuyerNotificationListener from './components/BuyerNotificationListener';
import FarmerNotificationManager from './components/FarmerNotificationManager';
import NotificationPopover1 from './components/Notificationpopover1'; 
import TrackOrder from './components/TrackOrder';

function App() {
  const {  setUser, role, setRole } = useContext(UserContext);

  useEffect(() => {
    axios.get("http://localhost:8080/auth/me", {
      withCredentials: true,
    })
      .then(res => {
        setRole(res.data.role);
        setUser(res.data);
      })
      .catch(err => {
        setUser(null);
        setRole('');
      });
  }, [setUser, setRole]);

  return (
    <Router>
      <Navbar />
      <NotificationPopover />
      {role === 'Buyer' && <NotificationPopover1 />}
      {role === 'Buyer' && <BuyerNotificationListener />}
      {role === 'Farmer' && <FarmerNotificationManager />} 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/advise" element={<CropAdvisory />} />
        <Route path="/login" element={<User />} />
        <Route path="/signup" element={<User1 />} />
        <Route path="/farmerslogin" element={<Login role="Farmer" />} />
        <Route path="/buyerslogin" element={<Login role="Buyer" />} />
        <Route path="/farmerssignup" element={<SignUp />} />
        <Route path="/buyerssignup" element={<SignUp1 />} />
        <Route path="/farmerdashboard" element={<Dashboard />} />
        <Route path="/buyerdashboard" element={<Dashboard1 />} />
        <Route path="/farmerprofile" element={<Profile />} />
        <Route path="/buyerprofile" element={<Profile />} />
        <Route path="/carts" element={<Carts />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/vieworders" element={<ViewOrders />} />
        <Route path="/market" element={<Market />} />
        <Route path="/viewcart" element={<ViewCart />} />
        <Route path="/myorders" element={<Myorders />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/notif" element={<Notif />} />
        <Route path="/track/:orderId" element={<TrackOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
