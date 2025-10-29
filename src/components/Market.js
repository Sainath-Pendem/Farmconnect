import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Market.css'; 
import UserContext from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const Market = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { cartitems, setCartitems, addtocart } = useContext(UserContext);

  const viewcart = () => {
    navigate('/viewcart');
  };

  useEffect(() => {
    axios.get('http://localhost:8080/buyer/products', {
      withCredentials: true
    })
      .then(response => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="market-container">
      <div className="d-flex justify-content-between">
        <h2>Marketplace</h2>
        <button className="btn btn-success" onClick={viewcart}>
          🛒 ViewCart
          <span className="badge bg-dark mx-2">{cartitems.length}</span>
        </button>
      </div>

      <div className="product-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <h3>{product.name}</h3>
            {product.imagename && (
              <img
                src={`data:${product.imagetype};base64,${product.url}`}
                alt={product.name}
                className="product-image"
                loading="lazy"
              />
            )}
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Price:</strong> ₹{product.price} per kg</p>
            <p><strong>Quantity:</strong> {product.quantity} kgs</p>
            <button className='btn btn-success' onClick={() => addtocart(product)}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;
