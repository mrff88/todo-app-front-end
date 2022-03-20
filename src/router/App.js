// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Login from '../pages/Login';
import PasswordRecovery from '../pages/PasswordRecovery';
import Register from '../pages/Register';
import Tasks from '../pages/Tasks';
import VerifyEmail from '../pages/VerifyEmail';
import { selectToken } from '../redux/slices/userSlice';
import HideIfLogged from '../util/HideIfLogged';
import parseJwt from '../util/parseJWT';
import RequireAuth from '../util/RequiresAuth';

const App = () => {
  const token = useSelector(selectToken);
  const sesion = parseJwt(token);

  return (
    <div className="d-flex flex-column vh-100">
      <Navigation />
      <Routes>
        <Route index element={sesion ? <Tasks /> : <Login />} />
        <Route
          exact
          path="/tasks"
          element={
            <RequireAuth>
              <Tasks />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/register"
          element={
            <HideIfLogged>
              <Register />
            </HideIfLogged>
          }
        />
        <Route
          exact
          path="/password-recovery"
          element={
            <HideIfLogged>
              <PasswordRecovery />
            </HideIfLogged>
          }
        />
        <Route
          exact
          path="/verify-email/users/:id/verify/:token"
          element={
            <HideIfLogged>
              <VerifyEmail />
            </HideIfLogged>
          }
        />
        <Route
          path="/not-found"
          element={
            <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
              <h1>404</h1>
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </div>
  );
};

export default App;
