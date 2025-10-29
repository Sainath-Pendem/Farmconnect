import React from 'react'
import './Features.css'

const Features = () => {
    return (
        <>
        <div className='features-container heading d-flex justify-content-around my-2'>
            <h2>Features</h2>
        </div>
        <div className='d-flex justify-content-around'>
            <div>
                <h4>Farmers</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Direct Sales Without Middlemen</li>
                    <li className="list-group-item">Full Control Over Pricing</li>
                    <li className="list-group-item">Efficient Order Management</li>
                    <li className="list-group-item">Improved Profit Margins</li>
                    <li className="list-group-item">Reduced Market Dependency</li>
                </ul>
            </div>
            <div>
                <h4>Buyers</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Direct Purchase from Farmers</li>
                    <li className="list-group-item">ATransparent and Fair Pricing</li>
                    <li className="list-group-item">Easy Browsing and Ordering</li>
                    <li className="list-group-item">Order History and Tracking</li>
                    <li className="list-group-item">ASupport for Local Agriculture</li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default Features;



