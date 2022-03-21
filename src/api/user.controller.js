import axios from 'axios';

const API_SERVER = process.env.REACT_APP_API_BASE_URL;

const ENDPOINTS = {
  GET_ALL: '/api/users',
  CREATE: '/api/users/create',
  LOGIN: '/api/users/login',
  VERIFY: '/verify',
  REQUEST_PASSWORD_CHANGE_LINK: '/api/users/password-reset',
  VERIFY_PASSWORD_CHANGE_LINK: '/api/users/verify-password-reset',
  CHANGE_PASSWORD: '/api/users/change-password',
};

export const getAllUsers = async () => {
  const url = `${API_SERVER}${ENDPOINTS.GET_ALL}`;

  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (user) => {
  const url = `${API_SERVER}${ENDPOINTS.CREATE}`;

  try {
    const response = await axios.post(url, user);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const verify = async (id, token) => {
  const url = `${API_SERVER}${ENDPOINTS.GET_ALL}/${id}${ENDPOINTS.VERIFY}/${token}`;
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const login = async (user) => {
  const url = `${API_SERVER}${ENDPOINTS.LOGIN}`;

  try {
    const response = await axios.post(url, user);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const requestPasswordChangeLink = async (email) => {
  const url = `${API_SERVER}${ENDPOINTS.REQUEST_PASSWORD_CHANGE_LINK}`;
  try {
    const response = await axios.post(url, { email });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const verifyPasswordChangeLink = async (id, token) => {
  const url = `${API_SERVER}${ENDPOINTS.VERIFY_PASSWORD_CHANGE_LINK}/${id}/${token}`;

  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const changePassword = async (id, token, password) => {
  const url = `${API_SERVER}${ENDPOINTS.CHANGE_PASSWORD}/${id}/${token}`;

  try {
    const response = await axios.post(url, { password });
    return response;
  } catch (error) {
    return error.response;
  }
};
