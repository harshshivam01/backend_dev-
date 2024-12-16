import { Navigate } from 'react-router-dom';
import { authService } from '../services/authuser';

const ProtectedRoute = ({ children, requireAdmin=false }) => {
  if (!authService.isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !authService.isAdmin()) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
