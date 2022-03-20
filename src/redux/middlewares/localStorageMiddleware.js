import setOnLocalStorage from './setOnLocalStorage';

const localStorageMiddleware = (store) => {
  return (next) => (action) => {
    const result = next(action);
    setOnLocalStorage(store, action);
    return result;
  };
};

export default localStorageMiddleware;
