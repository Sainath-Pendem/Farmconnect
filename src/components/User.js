import React from 'react'
import {  useNavigate } from 'react-router-dom'
import './User.css';

const User = () => {
    let Navigate=useNavigate();

    let farmlog=()=>{
        Navigate("/farmerslogin");
    }
    let buylog=()=>{
        Navigate("/buyerslogin");
    }

    return (
        <div className="user-container">
            <div className="user-card fade-in-left">
                <p className="user-label">Farmer</p>
                <button type="button" onClick={farmlog} className="btn btn-outline-success">&rarr;</button>
            </div>

            <div className="user-card fade-in-right">
                <p className="user-label">Buyer</p>
                <button type="button" onClick={buylog} className="btn btn-outline-success">&rarr;</button>
            </div>
        </div>
    )
}

export default User
