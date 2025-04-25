import { createContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = () => {
    setIsAuthenticated(true);
    navigate("/home"); // Redirect to dashboard after login
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate("/login", { replace: true }); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // Validate that children is required
  };
export default AuthContext;