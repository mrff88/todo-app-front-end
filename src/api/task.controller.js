import axios from 'axios';

const API_SERVER = 'http://localhost:5000';

const ENDPOINTS = {
  GET_ALL: '/api/tasks',
  CREATE: '/api/tasks/create',
  UPDATE: '/api/tasks/update',
  DELETE: '/api/tasks/delete',
};

export const getAllTasks = async () => {
  const url = `${API_SERVER}${ENDPOINTS.GET_ALL}`;
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createTask = async (task) => {
  const url = `${API_SERVER}${ENDPOINTS.CREATE}`;

  try {
    const response = await axios.post(url, task);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async ({ id, ...task }) => {
  const url = `${API_SERVER}${ENDPOINTS.UPDATE}/${id}`;

  try {
    const response = await axios.put(url, task);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id) => {
  const url = `${API_SERVER}${ENDPOINTS.DELETE}/${id}`;

  try {
    const response = await axios.delete(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};
