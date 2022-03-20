import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, selectIsLoading } from '../redux/slices/userSlice';

const Login = () => {
  const isLogginIn = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { elements } = e.target;
    const user = {
      email: elements[0].value,
      password: elements[1].value,
    };
    dispatch(loginAsync(user));
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
      <h1>Iniciar Sesión</h1>
      <form className="col-12 col-md-6" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Correo Electónico
          </label>
          <input type="email" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Contraseña
          </label>
          <input type="password" className="form-control" />
        </div>
        <div className="d-grid">
          {isLogginIn ? (
            <button
              type="button"
              disabled
              className="btn btn-primary w-50 mx-auto"
            >
              Cargando...
            </button>
          ) : (
            <button type="submit" className="btn btn-primary w-50 mx-auto">
              Ingresar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
