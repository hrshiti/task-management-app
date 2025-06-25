import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRole }) => {
  const { token, role } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/unauthorized" />;

  return children;
};

export default PrivateRoute;
