import { useContext, useEffect, useState } from 'react';
import './Profile.css';
import UserContext from '../Context/UserContext';
import axios from 'axios';

const Profile = () => {
  const { user } = useContext(UserContext); // `user` is just email string

  const [profileData, setProfileData] = useState(null);

  const {role}=useContext(UserContext);

  const [error, setError] = useState('');

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
          setError('Failed to load profile data.');
        });
    }
  }, [user,role]);


  if (!user) {
    return <div> No user found. Please log in.</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!profileData) {
    return <div>Loading profile for {user.email}...</div>;
  }

  return (
    <div className="profile-container d-flex animate-profile">
      <div className="profile-left d-flex justify-content-center align-items-center">
        {profileData.imageUrl ? (
          <img
            src={profileData.imageUrl}
            alt="Profile"
            className="profile-image"
          />
        ) : (
          <i className="fas fa-user-circle fa-4x profile-icon"></i>
        )}
      </div>
      



      <div className="profile-right">
        

        <div className=" d-flex profile-header  my-2">
          <h1 className="profile-name mx-2"><b>{profileData.firstname.toUpperCase() || 'First Name'}</b></h1>

          <h1 className="profile-name"><b>{profileData.lastname.toUpperCase() || 'Last Name'}</b></h1>
        </div>

        <h3 className="profile-email">{profileData.email}</h3>

        <h3 className="profile-phone">{profileData.phone}</h3>



        <div>
          <h5>Address:</h5>
          <p className="address-placeholder">{profileData.address || 'Your address goes here...'}</p>
          <p className="address-placeholder">{profileData.city || 'Your city goes here...'}</p>
          <p className="address-placeholder">{profileData.pincode || 'Your pincode goes here...'}</p>
        </div>


      </div>
    </div>
  );
};

export default Profile;
