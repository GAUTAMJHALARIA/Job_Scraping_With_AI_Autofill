import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem("Users");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Store user data in localStorage when it changes
  useEffect(() => {
    if (authUser) {
      localStorage.setItem("Users", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("Users");
    }
  }, [authUser]);
 
  const logout = () => setAuthUser(null);


  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
 

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useAuth = () => useContext(AuthContext);
