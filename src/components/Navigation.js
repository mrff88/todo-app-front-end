import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOut, selectToken } from '../redux/slices/userSlice';
import parseJwt from '../util/parseJWT';

const Navigation = () => {
  const token = useSelector(selectToken);
  const sesion = parseJwt(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    dispatch(logOut());
    navigate('/', { replace: true });
  };

  return (
    <nav className="navbar sticky-top navbar-dark bg-dark navbar-expand-md">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          TODO APP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarLinks"
          aria-controls="navbarLinks"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbarLinks">
          <ul className="navbar-nav ms-auto align-items-center mb-2 mb-lg-0">
            {sesion ? (
              <li className="nav-item">
                <span
                  style={{ cursor: 'pointer' }}
                  className="nav-link"
                  onClick={cerrarSesion}
                >
                  Cerrar sesión
                </span>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Regístrate
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/password-recovery">
                    Recuperar contraseña
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
