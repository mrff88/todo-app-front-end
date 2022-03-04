import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taskList: [
    {
      id: 1,
      titulo: 'Comprar leche',
      completado: false,
    },
    {
      id: 2,
      titulo: 'Hacer presentación de React',
      completado: true,
    },
    {
      id: 3,
      titulo: 'Sacar la basura',
      completado: false,
    },
  ],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    createTodo(state, action) {
      state.taskList = [
        ...state.taskList,
        {
          id: Math.floor(Math.random * 100),
          titulo: action.payload,
          completado: false,
        },
      ];
    },
    toggleTodo(state, action) {
      state.taskList = state.taskList.map((tarea) =>
        tarea.id === action.payload
          ? { ...tarea, completado: !tarea.completado }
          : tarea
      );
    },
    editTodo(state, action) {
      state.taskList = state.taskList.map((tarea) =>
        tarea.id === action.payload.id
          ? {
              id: action.payload.id,
              titulo: action.payload.titulo,
              completado: action.payload.completado,
            }
          : tarea
      );
    },
    deleteTodo(state, action) {
      state.taskList = state.taskList
        .map((tarea) => (tarea.id === action.payload ? null : tarea))
        .filter((tarea) => tarea != null);
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice;
