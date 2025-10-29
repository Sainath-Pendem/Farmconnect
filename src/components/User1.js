import React from 'react'
import {  useNavigate } from 'react-router-dom';
import './User1.css';

const User = () => {
    let Navigate=useNavigate();

    let farmsign=()=>{
        Navigate("/farmerssignup");
    }
    let buysign=()=>{
        Navigate("/buyerssignup");
    }

    return (
        <div className="user-container">
            <div className="user-card fade-in-left">
                <p className="user-label">Farmer</p>
                <button type="button" onClick={farmsign} className="btn btn-outline-success">&rarr;</button>
            </div>

            <div className="user-card fade-in-right">
                <p className="user-label">Buyer</p>
                <button type="button" onClick={buysign} className="btn btn-outline-success">&rarr;</button>
            </div>
        </div>
    )
}

export default User
