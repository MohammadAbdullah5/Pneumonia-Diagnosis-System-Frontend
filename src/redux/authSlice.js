// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'https://localhost:7098/api'; // Update to your actual API base URL

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${API}/auth/login`, credentials, { withCredentials: true });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (userInfo, thunkAPI) => {
  try {
    const response = await axios.post(`${API}/auth/signup`, userInfo);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const verifyMfaCode = createAsyncThunk('auth/verifyMfaCode', async (payload, thunkAPI) => {
  try {
    const response = await axios.post(`${API}/auth/verify-2fa`, payload);
    return response.data; // This will return user object and token on successful MFA verification
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.userId = null;
      state.requiresMfa = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { requiresMfa, userId } = action.payload;
        state.requiresMfa = requiresMfa;
        state.userId = userId;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to login';
      })

      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.requiresMfa = true;
        state.userId = action.payload.userId;
        state.email = action.payload.email;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to register';
      }).addCase(verifyMfaCode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyMfaCode.fulfilled, (state, action) => {
        const { user, token } = action.payload; // The user and token are returned here
        state.user = user;
        state.token = token;
        state.requiresMfa = false; // MFA is no longer required after successful verification
        state.userId = null; // Clear userId after MFA step
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(verifyMfaCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'MFA verification failed';
      });;
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
