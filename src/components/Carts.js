import React, { useEffect, useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './Carts.css';
import UserContext from '../Context/UserContext';


const Carts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const { user } = useContext(UserContext); 

    const [profileData, setProfileData] = useState(null);

    const { role } = useContext(UserContext);

  


    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:8080/${role.toLowerCase()}/${user.email}`, {
                withCredentials: true,
            })
                .then((res) => {
                    setProfileData(res.data);
                })
                .catch((err) => {
                    console.error(" Failed to load profile:", err);
                });
        }
    }, [user, role]);


    useEffect(() => {
        
        const fetchProducts = async () => {
            if(!profileData) return;
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get(`http://localhost:8080/farmer/products/${profileData.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                setProducts(response.data);
            } catch (error) {
                console.error(" Unauthorized - token may be invalid or expired.", error);
            }
        };

        fetchProducts();
    }, [profileData]);

    const handleAddProduct = () => {
        navigate("/addproduct");
    };

    const handleedit = (product) => {
        navigate("/addproduct", { state: { product } });
    };

    const handleDelete = async (productId) => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(`http://localhost:8080/farmer/product/delete/${productId}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const res = await axios.get(`http://localhost:8080/farmer/products/${profileData.id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProducts(res.data);
            console.log(" Deleted successfully");

        } catch (error) {
            console.error(" Delete failed:", error);
        }
    };



    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Your Products</h2>
                <button onClick={handleAddProduct} className="btn btn-success">Add Product</button>
            </div>

            <div className="row">
                {products.length === 0 ? (
                    <p className="text-muted">No products added yet.</p>
                ) : (
                    products.map((product) => (
                        <div key={product.p_id} className="col-md-4 mb-4">
                            <div className="card shadow-sm h-100">
                                <img
                                    src={`http://localhost:8080/farmer/product/${product.p_id}/image`}
                                    alt={product.name}
                                    style={{ height: "180px", objectFit: "cover" }}
                                    className="card-img-top"
                                    onError={(e) => (e.target.src = "https://via.placeholder.com/300x180?text=No+Image")}
                                />

                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">
                                            <strong>Category:</strong> {product.category}<br />
                                            <strong>Price(per kg):</strong> ₹{product.price}<br />
                                            <strong>Quantity:</strong> {product.quantity}<br />
                                            <strong>Date:</strong> {formatDate(product.date)}
                                        </p>
                                    </div>
                                    <div className="d-flex justify-content-between mt-3">
                                        <button className="btn btn-primary btn-sm" onClick={() => handleedit(product)}>
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => handleDelete(product.p_id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Carts;
