import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import PropTypes from "prop-types";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();  // Auth state ko check karna

  return (
    <Route 
      {...rest} 
      element={isAuthenticated ? Component : <Navigate to="/login" />}  // Agar user logged in hai to Component dikhayenge, nahi to login page par redirect karenge
    />
  );
};
PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
