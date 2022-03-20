import axios from 'axios';

const API_SERVER = 'http://localhost:5000';

const ENDPOINTS = {
  GET_ALL: '/api/users',
  CREATE: '/api/users/create',
  LOGIN: '/api/users/login',
  VERIFY: '/verify',
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
