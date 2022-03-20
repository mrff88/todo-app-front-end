import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HideIfLogged = ({ children }) => {
  const token = useSelector((state) => state.users.token);

  //for the routes we don't want to show when logged in
  if (token) return <Navigate to="/" replace />;

  return children;
};

export default HideIfLogged;
