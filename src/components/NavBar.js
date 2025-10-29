import { useContext } from "react";
import { Link,  useLocation, useNavigate } from "react-router-dom";
import UserContext from '../Context/UserContext';
import axios from 'axios';
import './NavBar.css'


export default function Navbar(props) {

    let location = useLocation();

    const { toggle, setToggle } = useContext(UserContext);

    const { role, setRole } = useContext(UserContext);

    const { user, setUser } = useContext(UserContext);


    let navigate = useNavigate();

    const handlesign = () => {
        navigate("/signup");

    }

    const handlelog = () => {
        navigate("/login");
    }
    const handlelogout = async () => {
        try {
            await axios.post("http://localhost:8080/auth/logout", {}, {
                withCredentials: true
            });

            setUser(null);       
            setRole('');        
            setToggle(false);    
            navigate("/");       

            alert("Logged out successfully");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };
    const handleprofile = () => {
        role === "Farmer" ?navigate("/farmerprofile"):navigate("/buyerprofile");
    }

    return (
        <>
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'rgb(47 200 54)' }}>
            <img src="icon.png" alt="Farm Connect Logo" width="20" height="20" className="d-inline-block align-top mr-2"/>
            <h4 className="" style={{marginRight:'30px',color:'white'}}><b>Farm Connect</b></h4>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
                        <Link className="nav-link" to="/">Home<span className="sr-only">(current)</span></Link>
                    </li>
                    <li className={`nav-item ${location.pathname === "/about" ? "active" : ""}`}>
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                    {!user && <li className={`nav-item ${location.pathname === "/advise" ? "active" : ""}`}>
                        <Link className="nav-link" to="/advise">Crop Details</Link>
                    </li>}
                    {user && <li className={`nav-item ${location.pathname === (role === "Farmer" ? "/farmerdashboard" : "/buyerdashboard") ? "active" : ""}`}>
                        <Link className="nav-link" to={role === "Farmer"?"/farmerdashboard":"/buyerdashboard"}>Dashboard</Link>
                    </li>}
                    {user && <li className={`nav-item ${location.pathname === (role === "Farmer" ? "/carts" : "/market") ? "active" : ""}`}>
                        <Link className="nav-link" to={role === "Farmer" ? "/carts" : "/market"}>
                            {role === "Farmer" ? "My Carts" : "Market"}
                        </Link>
                    </li>}
                    {user && <li className={`nav-item ${location.pathname === (role === "Farmer" ? "/vieworders" : "/myorders") ? "active" : ""}`}>
                        <Link className="nav-link" to={role === "Farmer" ? "/vieworders" : "/myorders"}>
                            {role === "Farmer" ? "View Orders" : "My Orders"}
                        </Link>
                    </li>}
                </ul>
            </div>

            <div className="d-flex  justify-content-center align-items-center ">
                {!user ? <div className="login mx-2">
                    <button type="button" onClick={handlelog} className="btn custom-btn btn-light">Log in</button>
                </div> :
                    <div className="login mx-2">
                        <button type="button" onClick={handlelogout} className="btn custom-btn btn-light">Log Out</button>
                    </div>}
                {!user ? <div className="signup mx-2">
                    <button type="button" onClick={handlesign} className="btn custom-btn btn-light">Sign up</button>
                </div> :
                    <div className="signup mx-2">
                        <button type="button" onClick={handleprofile} className="profile btn custom-btn btn-light" style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            padding: '0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <i className="fa-regular fa-circle-user fa-2x"></i>

                        </button>
                    </div>}
            </div>
        </nav>
        </>
    )
}