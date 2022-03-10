import { Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Login from '../pages/Login';
import PasswordRecovery from '../pages/PasswordRecovery';
import Register from '../pages/Register';
import Tasks from '../pages/Tasks';

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route index element={<Login />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="register" element={<Register />} />
        <Route path="password-recovery" element={<PasswordRecovery />} />
      </Routes>
    </>
  );
};

export default App;
