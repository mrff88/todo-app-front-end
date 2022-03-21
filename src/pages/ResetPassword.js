import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  requestPasswordChangeLinkAsync,
  selectIsRequestingLink,
  selectRequestErrorMessage,
  selectRequestMessage,
} from '../redux/slices/userSlice';

const ResetPassword = () => {
  const isRequesting = useSelector(selectIsRequestingLink);
  const requestMessage = useSelector(selectRequestMessage);
  const requestErrorMessage = useSelector(selectRequestErrorMessage);
  const formRef = useRef();
  const dispatch = useDispatch();

  const resetForm = () => {
    formRef.current[0].value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { elements } = e.target;
    const email = elements[0].value;
    dispatch(requestPasswordChangeLinkAsync(email));
    resetForm();
  };
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
      <h1>Restablecer Contraseña</h1>
      <form className="col-12 col-md-6" onSubmit={handleSubmit} ref={formRef}>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Correo Electónico
          </label>
          <input id="inputEmail" type="email" className="form-control" />
        </div>
        <div className="d-grid">
          {isRequesting ? (
            <button
              type="button"
              disabled
              className="btn btn-primary w-50 mx-auto"
            >
              Solicitando...
            </button>
          ) : (
            <button type="submit" className="btn btn-primary w-50 mx-auto">
              Solicitar
            </button>
          )}
        </div>
        {requestMessage?.length > 0 && <h2>{requestMessage}</h2>}
        {requestErrorMessage?.length > 0 && <h2>{requestErrorMessage}</h2>}
      </form>
    </div>
  );
};

export default ResetPassword;
