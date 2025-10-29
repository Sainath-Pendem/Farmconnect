import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import about1 from './about1.jpg';
import about2 from "./about2.jpg";
import about3 from './about3.jpg';
import './Home.css';
import Howitworks from "./Howitworks";
import Footer from './footer';

export default function Home() {
    return (
        <>
            <div style={{ position: 'relative' }}>
                <div
                    id="carouselExampleSlidesOnly"
                    className="carousel slide d-flex justify-content-center"
                    data-bs-ride="carousel"
                    data-bs-interval="1000"
                >
                    <div
                        className="carousel-inner"
                        style={{ width: '100vw', height: '90vh', overflow: 'hidden' }}
                    >
                        <div className="carousel-item active">
                            <img
                                src={about2}
                                className="d-block w-100"
                                alt="..."

                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src={about1}
                                className="d-block w-100"
                                alt="..."

                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src={about3}
                                className="d-block w-100"
                                alt="..."

                            />
                        </div>
                    </div>
                </div>

                <div className="service-overlay d-flex justify-content-between px-5 py-4">
                    <div className="service-box text-center">
                        <i className="fa-solid fa-store fa-3x mb-2"></i>
                        <div>Farms</div>
                    </div>
                    <div className="service-box text-center">
                        <i className="fa-solid fa-truck fa-3x mb-2"></i>
                        <div>Delivery</div>
                    </div>
                    <div className="service-box text-center">
                        <i className="fa-solid fa-location-dot fa-3x mb-2"></i>
                        <div>Tracking</div>
                    </div>
                </div>
            </div>
            <Howitworks />
        <Footer />
        </>
    )
}