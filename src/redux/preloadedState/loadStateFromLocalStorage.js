const checkLocalStorage = () => {
  return localStorage.getItem('infoUser');
};

const createPreload = () => {
  const preloadObject = {};
  preloadObject.users = {};
  preloadObject.users.token = JSON.parse(
    localStorage.getItem('infoUser')
  )?.token;
  return preloadObject;
};

const loadStateFromLocalStorage = () => {
  if (!checkLocalStorage()) {
    localStorage.setItem('infoUser', null);
  }
  return createPreload();
};

export default loadStateFromLocalStorage;
