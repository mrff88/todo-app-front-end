import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userCtlr } from '../../api';
import taskSlice from './taskSlice';

const initialState = {
  userList: [],
  user: {},
};

// Async thunks
export const getAllUsersAsync = createAsyncThunk('users/getAll', async () => {
  const response = await userCtlr.getAllUsers();
  return response.data instanceof Array ? response.data : [];
});

export const createUserAsync = createAsyncThunk(
  'users/create',
  async (user) => {
    const response = await userCtlr.createUser(user);
    return response;
  }
);

export const loginAsync = createAsyncThunk('users/login', async (user) => {
  const response = await userCtlr.login(user);
  console.log(response);
  return response;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
    },
    setToken: (state, { payload: token }) => {
      state.token = token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsersAsync.fulfilled, (state, { payload: asyncUsers }) => {
        state.isLoading = false;
        state.userList = asyncUsers;
      })
      .addCase(createUserAsync.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createUserAsync.fulfilled, (state, { payload: AsyncUser }) => {
        state.isCreating = false;
        state.created = AsyncUser;
      })
      .addCase(loginAsync.pending, (state) => {
        state.isLoginIn = true;
      })
      .addCase(loginAsync.fulfilled, (state, { payload: token }) => {
        localStorage.setItem('token', JSON.stringify(token));
        state.isLoginIn = false;
        state.token = token;
      });
  },
});

// actions
export const { logOut, setToken } = taskSlice.actions;

// selectors
export const selectUsers = (state) => state.users.userList;
export const selectToken = (state) => state.users.token;

// thunks

export default userSlice;
