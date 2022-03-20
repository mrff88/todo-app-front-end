const setOnLocalStorage = (store, action) => {
  switch (action.type) {
    case 'users/logOut':
      localStorage.setItem(
        'infoUser',
        JSON.stringify({ token: store.getState().users.token })
      );
      break;
    case 'login/fulfilled':
      localStorage.setItem(
        'infoUser',
        JSON.stringify({ token: store.getState().users.token })
      );
      break;

    default:
      console.log(action.type);
      break;
  }
};

export default setOnLocalStorage;
