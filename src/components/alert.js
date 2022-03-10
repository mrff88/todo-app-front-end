function alert({ state = 'primary', message = 'default message' }) {
  const classStatus = 'alert alert-dismissible alert-' + state;
  return (
    <div className={classStatus} role="alert">
      {message}
    </div>
  );
}

export default alert;
