import React from 'react'
import './Howitworks.css'


const Howitworks = () => {
    return (
        <div className="how-it-works-wrapper">
            <div className='heading my-3 d-flex justify-content-center text-success'>
                <h2><b>How It Works?</b></h2>
            </div>
            <div className="subhead my-2 d-flex justify-content-center ">
                <h3>For Farmers</h3>
            </div>
            <div className='row my-3 d-flex justify-content-center' style={{ margin: '20px 0px' }}>
                <div className="col-md-3 card mx-3">
                    <div className="card-body">
                        <i className="fa-solid fa-user-plus fa-2x my-2" style={{ display: 'flex', justifyContent: 'center' }}></i>
                        <h5 className="card-title" style={{ display: 'flex', justifyContent: 'center' }}>Creating Profile</h5>
                        <p className="card-text">The farmer starts by registering on the platform using a valid mobile number, email address, or username along with a password. </p>
                    </div>
                </div>
                <div className="col-md-3 card mx-3">
                    <div className="card-body">
                        <i className="fa-solid fa-list fa-2x my-2" style={{ display: 'flex', justifyContent: 'center' }}></i>
                        <h5 className="card-title" style={{ display: 'flex', justifyContent: 'center' }}>Adding Items</h5>
                        <p className="card-text">They can enter important details such as the name of the produce, the price per unit, the quantity available, and upload an image of the item. Once submitted, the listing becomes visible to buyers on the platform.</p>
                    </div>
                </div>
                <div className="col-md-3 card mx-3">
                    <div className="card-body">
                        <i className="fa-solid fa-eye fa-2x my-2" style={{ display: 'flex', justifyContent: 'center' }}></i>
                        <h5 className="card-title" style={{ display: 'flex', justifyContent: 'center' }}>View Orders</h5>
                        <p className="card-text">Farmers can view all orders placed by buyers on their produce listings through the "Orders" section. </p>
                    </div>
                </div>
            </div>
            <div className="subhead my-2 d-flex justify-content-center ">
                <h3>For Buyers</h3>
            </div>
            <div className='row my-3 d-flex justify-content-center' style={{ margin: '20px 0px' }}>
                <div className="col-md-3 card mx-3">
                    <div className="card-body">
                        <i className="fa-solid fa-user-plus fa-2x my-2" style={{ display: 'flex', justifyContent: 'center' }}></i>
                        <h5 className="card-title" style={{ display: 'flex', justifyContent: 'center' }}>Creating Profile</h5>
                        <p className="card-text">The buyer begins by registering on the platform using their phone number, email, or username along with a password. Once registered, they can securely log in to access the marketplace.</p>
                    </div>
                </div>
                <div className="col-md-3 card mx-3">
                    <div className="card-body">
                        <i className="fa-solid fa-layer-group fa-2x my-2" style={{ display: 'flex', justifyContent: 'center' }}></i>
                        <h5 className="card-title" style={{ display: 'flex', justifyContent: 'center' }}>Browsing Items</h5>
                        <p className="card-text">The buyer can browse through all available produce listings posted by farmers. Each listing displays the product name, price, quantity, and image to help the buyer make informed decisions.</p>
                    </div>
                </div>
                <div className="col-md-3 card mx-3">
                    <div className="card-body">
                        <i className="fa-solid fa-check fa-2x my-2" style={{ display: 'flex', justifyContent: 'center' }}></i>
                        <h5 className="card-title" style={{ display: 'flex', justifyContent: 'center' }}>Place an Order</h5>
                        <p className="card-text">Once a desired product is selected, the buyer can enter the quantity required and place an order directly with the farmer. The order is then saved and forwarded to the respective farmer for processing.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Howitworks
