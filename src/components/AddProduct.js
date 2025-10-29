import React, { useState, useRef, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddProduct.css';
import UserContext from '../Context/UserContext';


const AddProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const productToEdit = location.state?.product;

    const { user } = useContext(UserContext);
    const [profileData, setProfileData] = useState(null);

    const { role } = useContext(UserContext);

    const [product, setProduct] = useState({
        name: '',
        price: '',
        category: '',
        quantity: '',
        date: '',
    });

    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);

    // Fetch profile data of farmer
    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:8080/${role.toLowerCase()}/${user.email}`, {
                withCredentials: true,
            })
                .then((res) => {
                    setProfileData(res.data);
                })
                .catch((err) => {
                    console.error("❌ Failed to load profile:", err);
                });
        }
    }, [user, role]);

    useEffect(() => {
        if (productToEdit && profileData) {
            setProduct({
                name: productToEdit.name || '',
                price: productToEdit.price || '',
                category: productToEdit.category || '',
                quantity: productToEdit.quantity || '',
                date: productToEdit.date || '',
                pincode: profileData.pincode || '',
                id: profileData.id || '', 
            });
        }
    }, [productToEdit, profileData]);


    const handleChange = (e) => {
        const { id, value } = e.target;
        setProduct((prev) => ({ ...prev, [id]: value }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        const formData = new FormData();
        if (image) {
            formData.append('imageFile', image);
        }

        if (!productToEdit && profileData) {
            setProduct((prev) => ({
                ...prev,
                pincode: profileData.pincode,
                farmer: { id: profileData.id },
            }));
        }

        const finalProduct = {
            ...product,
            ...(profileData && {
                pincode: profileData.pincode,
                farmer: { id: profileData.id },
            }),
        };

        formData.append(
            'product',
            new Blob([JSON.stringify(finalProduct)], { type: 'application/json' })
        );

        console.log(finalProduct)

        try {
            let response;

            if (productToEdit) {
                response = await axios.put(
                    `http://localhost:8080/farmer/product/update/${productToEdit.p_id}`,
                    formData,
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setMessage('Product updated successfully');
            } else {
                response = await axios.post(
                    'http://localhost:8080/farmer/product',
                    formData,
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setMessage(' Product added successfully');
            }


            setProduct({ name: '', price: '', category: '', quantity: '', date: '', id: '' });
            setImage(null);
            if (fileInputRef.current) fileInputRef.current.value = null;

            setTimeout(() => navigate('/carts'), 500);

        } catch (error) {
            console.error('❌ Failed to submit product:', error);
            setMessage('❌ Submission failed.');
        }
    };

    return (
        <div className="add-product-container">
            {/* Heading outside of .row */}
            <div className="form-box animate-form">
                <h2 className="text-center mb-4">{productToEdit ? 'Edit Product' : 'Add Product'}</h2>

                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={product.name} onChange={handleChange} />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="category" className="form-label">Category</label>
                        <input type="text" className="form-control" id="category" value={product.category} onChange={handleChange} />
                    </div>

                    <div className="col-6">
                        <label htmlFor="price" className="form-label">Price:(per kg)</label>
                        <input type="number" className="form-control" id="price" value={product.price} onChange={handleChange} />
                    </div>

                    <div className="col-6">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input type="number" className="form-control" id="quantity" value={product.quantity} onChange={handleChange} />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" className="form-control" id="date" value={product.date} onChange={handleChange} />
                    </div>

                    <div className="col-md-6 mb-3 file-upload-container">
                        <label htmlFor="formFileSm" className="form-label">Product Image</label>
                        <input className="form-control form-control-sm" style={{ border: 'none' }} ref={fileInputRef} id="formFileSm" type="file" onChange={handleImageChange} />
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-success">{productToEdit ? 'Update' : 'Save'}</button>
                        {message && <p style={{ marginTop: '10px', color: message.includes('❌') ? 'red' : 'green' }}>{message}</p>}
                    </div>
                </form>
            </div>
        </div>
    );

};

export default AddProduct;
