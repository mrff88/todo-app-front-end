import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  changePasswordAsync,
  selectIsChangingPassword,
  selectIsVerifyingPasswordChangeLink,
  selectVerifyPasswordChangeLinkErrorMessage,
  selectVerifyPasswordChangeLinkMessage,
  verifyPasswordChangeLinkAsync,
} from '../redux/slices/userSlice';

const ChangePassword = () => {
  const { id, token } = useParams();
  const isChangingPassword = useSelector(selectIsChangingPassword);
  const isVerifying = useSelector(selectIsVerifyingPasswordChangeLink);
  const verifyMessage = useSelector(selectVerifyPasswordChangeLinkMessage);
  const verifyErrorMessage = useSelector(
    selectVerifyPasswordChangeLinkErrorMessage
  );
  const formRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyPasswordChangeLinkAsync({ id, token }));
  }, [dispatch, id, token]);

  const resetForm = () => {
    formRef.current[0].value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { elements } = e.target;
    const password = elements[0].value;
    dispatch(changePasswordAsync({ id, token, password }));
    resetForm();
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
      <h1>Cambiar contraseña</h1>
      {isVerifying === true && <h2>Verificando...</h2>}
      {verifyMessage?.length > 0 && (
        <form className="col-12 col-md-6" onSubmit={handleSubmit} ref={formRef}>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">
              Contraseña
            </label>
            <input
              id="inputPassword"
              type="password"
              className="form-control"
            />
          </div>
          <div className="d-grid">
            {isChangingPassword ? (
              <button
                type="button"
                disabled
                className="btn btn-primary w-50 mx-auto"
              >
                Guardando...
              </button>
            ) : (
              <button type="submit" className="btn btn-primary w-50 mx-auto">
                Guardar
              </button>
            )}
          </div>
        </form>
      )}
      {verifyErrorMessage?.length > 0 && <h2>{verifyErrorMessage}</h2>}
    </div>
  );
};

export default ChangePassword;
