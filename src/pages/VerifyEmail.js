import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  selectIsVerifying,
  selectVerifyErrorMessage,
  selectVerifyMessage,
  verifyAsync,
} from '../redux/slices/userSlice';

const VerifyEmail = () => {
  const { id, token } = useParams();
  const isVerifying = useSelector(selectIsVerifying);
  const verifyMessage = useSelector(selectVerifyMessage);
  const verifyErrorMessage = useSelector(selectVerifyErrorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyAsync({ id, token }));
  }, [dispatch, id, token]);

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
      {isVerifying ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {verifyMessage?.length > 0 && (
            <>
              <h1>{verifyMessage}</h1>
              <Link to="/">Login</Link>
            </>
          )}
          {verifyErrorMessage?.length > 0 && (
            <>
              <h1>{verifyErrorMessage}</h1>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
