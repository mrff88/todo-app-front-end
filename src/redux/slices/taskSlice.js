import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { taskCtlr } from '../../api';

const initialState = {
  taskList: [],
  isLoading: false,
  isCreating: false,
  isEditing: false,
  isDeleting: false,
  created: {},
  edited: {},
  deleted: {},
};

export const getAllTaskAsync = createAsyncThunk('tasks/getAll', async () => {
  const response = await taskCtlr.getAllTasks();
  return response.data instanceof Array ? response.data : [];
});

export const createTaskAsync = createAsyncThunk(
  'tasks/create',
  async (task) => {
    const newTask = { title: task, isComplete: false };
    const response = await taskCtlr.createTask(newTask);
    return response.data;
  }
);

export const updateTaskAsync = createAsyncThunk(
  'tasks/update',
  async (task) => {
    const response = await taskCtlr.updateTask(task);
    return response.data;
  }
);

export const deleteTaskAsync = createAsyncThunk('tasks/delete', async (id) => {
  const response = await taskCtlr.deleteTask(id);
  return response.data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTaskAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTaskAsync.fulfilled, (state, { payload: asyncTasks }) => {
        state.isLoading = false;
        state.taskList = asyncTasks;
      })
      .addCase(createTaskAsync.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createTaskAsync.fulfilled, (state, { payload: asyncTask }) => {
        state.isCreating = false;
        state.created = asyncTask;
      })
      .addCase(updateTaskAsync.pending, (state) => {
        state.isEditing = true;
      })
      .addCase(updateTaskAsync.fulfilled, (state, { payload: asyncTask }) => {
        state.isEditing = false;
        state.edited = asyncTask;
      })
      .addCase(deleteTaskAsync.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, { payload: asyncTask }) => {
        state.isDeleting = false;
        state.deleted = asyncTask;
      });
  },
});

export const taskActions = taskSlice.actions;

export const selectTasks = (state) => state.tasks.taskList;
export const selectIsLoading = (state) => state.tasks.isLoading;
export const selectIsCreating = (state) => state.tasks.isCreating;
export const selectIsDeleting = (state) => state.tasks.isDeleting;
export const selectCreatedTask = (state) => state.tasks.created;
export const selectEditedTask = (state) => state.tasks.edited;
export const selectDeletedTask = (state) => state.tasks.deleted;

export default taskSlice;
