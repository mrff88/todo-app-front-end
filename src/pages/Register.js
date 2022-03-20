import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAsync, selectIsCreating } from '../redux/slices/userSlice';

const Register = () => {
  const isCreating = useSelector(selectIsCreating);
  const formRef = useRef();
  const dispatch = useDispatch();

  const resetForm = () => {
    formRef.current[0].value = '';
    formRef.current[1].value = '';
    formRef.current[2].value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { elements } = e.target;
    const user = {
      name: elements[0].value,
      email: elements[1].value,
      password: elements[2].value,
    };
    dispatch(createUserAsync(user));
    resetForm();
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
      <h1>Bienvenido! Regístrese</h1>
      <form className="col-12 col-md-6" onSubmit={handleSubmit} ref={formRef}>
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label">
            Nombre
          </label>
          <input id="inputName" type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Correo Electónico
          </label>
          <input id="inputEmail" type="email" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Contraseña
          </label>
          <input id="inputPassword" type="password" className="form-control" />
        </div>
        <div className="d-grid">
          {isCreating ? (
            <button
              type="button"
              disabled
              className="btn btn-primary w-50 mx-auto"
            >
              Registrando...
            </button>
          ) : (
            <button type="submit" className="btn btn-primary w-50 mx-auto">
              Registrar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
