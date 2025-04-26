import { createContext, useState} from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const useAuth = () => {
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // User ki state ko track karna
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Login status

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
