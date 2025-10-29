import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../Context/UserContext';
import Cookies from 'js-cookie';




const Login = (props) => {
    const navigate = useNavigate();

    const { role, setRole } = useUserContext();

    const { user, setUser } = useUserContext();

    const { toggle, setToggle } = useUserContext();


    
    console.log(user, role,toggle);
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setError('');

        try {
            const response = await axios.post(`http://localhost:8080/${props.role.toLowerCase()}/login`, {
                withCredentials:true,
                email,
                password
            });


            const token = response.data;

            Cookies.set('token', token, {
                expires: 7,
                sameSite: 'Strict',
                secure: false,
            });


            console.log('Token stored:', Cookies.get('token'));

            

            localStorage.setItem('token', token);
            localStorage.setItem('userRole', props.role);

            // ✅ Fetch user info now
            const userRes = await axios.get("http://localhost:8080/auth/me", {
                withCredentials: true
            });

            setUser(userRes.data);
            console.log(userRes.data.email)
            setRole(props.role);
            console.log(props.role)
            setToggle(true);


            navigate(`/${props.role.toLowerCase()}dashboard`);
        } catch (err) {
            console.log(err.message);
            setError("Invalid email or password");
        }
    };

    return (
        <>

            <div className='login-wrapper'>
                <div className='login-card rotate-in'>
                    <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">
                            {props.role} Login
                        </label>
                    </div>

                    <div className="col-md-12">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-md-12">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="text-danger px-3">{error}</p>}

                    <div className='btn1 mt-3'>
                        <button type="button" className="btn btn-success" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
