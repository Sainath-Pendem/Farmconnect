import { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');
  const [toggle, setToggle] = useState('');
  const [cartitems, setCartitems] = useState([]);

  const [notifications, setNotifications] = useState([]);

  const [farmerPopupNotification, setFarmerPopupNotification] = useState(null);
  const [buyerPopupNotification, setBuyerPopupNotification] = useState(null);

  const addtocart = (product) => {
    setCartitems((prev) => [...prev, product]);
  };

  const removefromcart = (id) => {
    setCartitems((prev) => prev.filter((item) => item.p_id !== id));
  };

  const showFarmerNotification = (msg) => {
    setFarmerPopupNotification(msg);
    setTimeout(() => setFarmerPopupNotification(null), 3000);
  };

  const showBuyerNotification = (msg) => {
    setBuyerPopupNotification(msg);
    setTimeout(() => setBuyerPopupNotification(null), 3000);
  };

  return (
    <UserContext.Provider value={{
      user, setUser,
      role, setRole,
      toggle, setToggle,
      cartitems, setCartitems,
      addtocart, removefromcart,
      notifications, setNotifications,
      farmerPopupNotification,
      buyerPopupNotification,
      showFarmerNotification,
      showBuyerNotification
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
export default UserContext;
