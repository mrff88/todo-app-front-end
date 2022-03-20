import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/slices/userSlice';

const RequireAuth = ({ children }) => {
  const token = useSelector(selectToken);

  //if user type doesn't match, go to not found
  if (!token) return <Navigate to="/not-found" replace />;

  return children;
};

export default RequireAuth;
