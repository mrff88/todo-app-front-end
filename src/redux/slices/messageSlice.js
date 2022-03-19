import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  status: '',
  showMessage: false,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    createTaskMessage(state) {
      state.message = 'La tarea ha sido creada con exito';
      state.status = 'success';
      state.showMessage = true;
    },
    editTaskMessage(state) {
      state.message = 'La tarea ha sido modificada con exito';
      state.status = 'warning';
      state.showMessage = true;
    },
    deleteTaskMessage(state) {
      state.message = 'La tarea ha sido eliminada con exito';
      state.status = 'danger';
      state.showMessage = true;
    },
  },
});

export const msgActions = messageSlice.actions;
export default messageSlice;
