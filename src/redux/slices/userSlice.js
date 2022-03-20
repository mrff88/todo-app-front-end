import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userCtlr } from '../../api';

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
  async (user, { rejectWithValue }) => {
    try {
      const response = await userCtlr.createUser(user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const verifyAsync = createAsyncThunk(
  'users/verify',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const { status, data } = await userCtlr.verify(id, token);
      if (status !== 200) throw new Error(data.message);
      return data.message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginAsync = createAsyncThunk('login', async (user) => {
  const { data } = await userCtlr.login(user);
  return data.token;
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
      .addCase(verifyAsync.pending, (state) => {
        state.isVerifying = true;
        state.verifyMessage = null;
        state.verifyErrorMessage = null;
      })
      .addCase(verifyAsync.fulfilled, (state, { payload: message }) => {
        state.isVerifying = false;
        state.verifyMessage = message;
      })
      .addCase(verifyAsync.rejected, (state, { payload: message }) => {
        state.isVerifying = false;
        state.verifyErrorMessage = message;
      })
      .addCase(loginAsync.pending, (state) => {
        state.isLoginIn = true;
      })
      .addCase(loginAsync.fulfilled, (state, { payload: token }) => {
        state.isLoginIn = false;
        state.token = token;
      });
  },
});

// actions
export const { logOut, setToken } = userSlice.actions;

// selectors
export const selectUsers = (state) => state.users.userList;
export const selectToken = (state) => state.users.token;
export const selectIsCreating = (state) => state.users.isCreating;
export const selectIsVerifying = (state) => state.users.isVerifying;
export const selectVerifyMessage = (state) => state.users.verifyMessage;
export const selectVerifyErrorMessage = (state) =>
  state.users.verifyErrorMessage;
export const selectIsLoading = (state) => state.users.isLoading;

// thunks

export default userSlice;
