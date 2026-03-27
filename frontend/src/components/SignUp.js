import { useState, useEffect } from 'react';
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
    const navigate = useNavigate();
    const [signupSuccess, setSignupSuccess] = useState(false);

    useEffect(() => {
        if (signupSuccess) {
            navigate("/farmerslogin");
        }
    }, [signupSuccess, navigate]);


    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        city: '',
        pincode: ''
    });

    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
        setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        const phoneRegex = /^[0-9]{10}$/;
        const pincodeRegex = /^[0-9]{6}$/;

        if (!formData.firstname.trim()) errors.firstname = 'First name is required';
        if (!formData.lastname.trim()) errors.lastname = 'Last name is required';

        if (!formData.email.trim()) errors.email = 'Email is required';
        else if (!emailRegex.test(formData.email)) errors.email = 'Invalid email format';

        if (!formData.password.trim()) errors.password = 'Password is required';
        else if (!passwordRegex.test(formData.password)) {
            errors.password = 'Min 8 chars, include number & special character';
        }

        if (!formData.phone.trim()) errors.phone = 'Phone is required';
        else if (!phoneRegex.test(formData.phone)) errors.phone = 'Phone must be 10 digits';

        if (!formData.address.trim()) errors.address = 'Address is required';
        if (!formData.city.trim()) errors.city = 'City is required';

        if (!formData.pincode.trim()) errors.pincode = 'Pincode is required';
        else if (!pincodeRegex.test(formData.pincode)) errors.pincode = 'Pincode must be 6 digits';

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        try {
            const x = await axios.get(`http://localhost:8080/farmer/verify/${formData.email}`);
            console.log(x);
            if (x.data) {
                setError("Email exists already");
                return;
            }
            const response = await axios.post("http://localhost:8080/farmer/signup", formData);
                console.log(response.data)
                setSignupSuccess(true);
                setFormData({
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    phone: '',
                    address: '',
                    city: '',
                    pincode: ''
                });
        } catch (err) {
            console.log(err);
            setError(err.response?.data || 'Signup failed. Try again.');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card my-3 d-flex justify-content-center">
                <h4>{props.user} SignUp</h4>
            </div>
            <form className="row g-3 mx-3 my-3" onSubmit={handleSubmit}>
                {[
                    { label: 'First Name', name: 'firstname', type: 'text' },
                    { label: 'Last Name', name: 'lastname', type: 'text' },
                    { label: 'Email', name: 'email', type: 'email' },
                    { label: 'Password', name: 'password', type: 'password' },
                    { label: 'Phone', name: 'phone', type: 'text' },
                    { label: 'Address', name: 'address', type: 'text' },
                    { label: 'City', name: 'city', type: 'text' },
                    { label: 'Pincode', name: 'pincode', type: 'text' }
                ].map(({ label, name, type }, index) => (
                    <div className="col-md-6" key={index}>
                        <label htmlFor={name} className="form-label">{label}</label>
                        <input
                            type={type}
                            className="form-control"
                            id={name}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                        />
                        {validationErrors[name] && (
                            <div className="text-danger" style={{ fontSize: '0.85rem' }}>{validationErrors[name]}</div>
                        )}
                    </div>
                ))}
                <div className="col-2 my-3">
                    <button type="submit" className="signup1 btn btn-success">Sign Up</button>
                </div>
                {error && <p className="text-danger mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default SignUp;
