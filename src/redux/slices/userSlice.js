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

export const requestPasswordChangeLinkAsync = createAsyncThunk(
  'users/requestPasswordChangeLink',
  async (email, { rejectWithValue }) => {
    try {
      const { status, data } = await userCtlr.requestPasswordChangeLink(email);
      if (status !== 200) throw new Error(data.message);
      return data.message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyPasswordChangeLinkAsync = createAsyncThunk(
  'users/verifyPasswordChangeLink',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const { status, data } = await userCtlr.verifyPasswordChangeLink(
        id,
        token
      );
      if (status !== 200) throw new Error(data.message);
      return data.message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changePasswordAsync = createAsyncThunk(
  'userd/changePassword',
  async ({ id, token, password }, { rejectWithValue }) => {
    try {
      const { status, data } = await userCtlr.changePassword(
        id,
        token,
        password
      );
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
      .addCase(requestPasswordChangeLinkAsync.pending, (state) => {
        state.isRequestingLink = true;
        state.requestMessage = null;
        state.requestErrorMessage = null;
      })
      .addCase(
        requestPasswordChangeLinkAsync.fulfilled,
        (state, { payload: message }) => {
          state.isRequestingLink = false;
          state.requestMessage = message;
        }
      )
      .addCase(
        requestPasswordChangeLinkAsync.rejected,
        (state, { payload: message }) => {
          state.isRequestingLink = false;
          state.requestErrorMessage = message;
        }
      )
      .addCase(verifyPasswordChangeLinkAsync.pending, (state) => {
        state.isVerifyingPasswordChangeLink = true;
        state.verifyPasswordChangeLinkMessage = null;
        state.verifyPasswordChangeLinkErrorMessage = null;
      })
      .addCase(
        verifyPasswordChangeLinkAsync.fulfilled,
        (state, { payload: message }) => {
          state.isVerifyingPasswordChangeLink = false;
          state.verifyPasswordChangeLinkMessage = message;
        }
      )
      .addCase(
        verifyPasswordChangeLinkAsync.rejected,
        (state, { payload: message }) => {
          state.isVerifyingPasswordChangeLink = false;
          state.verifyPasswordChangeLinkErrorMessage = message;
        }
      )
      .addCase(changePasswordAsync.pending, (state) => {
        state.isChangingPassword = true;
        state.changePasswordMessage = null;
        state.changePasswordErrorMessage = null;
      })
      .addCase(changePasswordAsync.fulfilled, (state, { payload: message }) => {
        state.isChangingPassword = false;
        state.changePasswordMessage = message;
      })
      .addCase(changePasswordAsync.rejected, (state, { payload: message }) => {
        state.isChangingPassword = false;
        state.changePasswordErrorMessage = message;
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
export const selectIsLoading = (state) => state.users.isLoading;
export const selectIsCreating = (state) => state.users.isCreating;
export const selectIsVerifying = (state) => state.users.isVerifying;
export const selectIsRequestingLink = (state) => state.users.isRequestingLink;
export const selectIsVerifyingPasswordChangeLink = (state) =>
  state.users.isVerifyingPasswordChangeLink;
export const selectIsChangingPassword = (state) =>
  state.users.isChangingPassword;
export const selectVerifyMessage = (state) => state.users.verifyMessage;
export const selectRequestMessage = (state) => state.users.requestMessage;
export const selectVerifyPasswordChangeLinkMessage = (state) =>
  state.users.verifyPasswordChangeLinkMessage;
export const selectChangePasswordMessage = (state) =>
  state.users.changePasswordMessage;
export const selectVerifyErrorMessage = (state) =>
  state.users.verifyErrorMessage;
export const selectRequestErrorMessage = (state) =>
  state.users.requestErrorMessage;
export const selectVerifyPasswordChangeLinkErrorMessage = (state) =>
  state.users.verifyPasswordChangeLinkErrorMessage;
export const selectChangePasswordErrorMessage = (state) =>
  state.users.changePasswordErrorMessage;

// thunks

export default userSlice;
