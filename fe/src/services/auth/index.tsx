import apiConstant from "@src/constants/api.constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestMethod } from "@src/hooks/useHookReducers";

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (parmas: object, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.get(apiConstant.auth.getMe, parmas);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const postLogin = createAsyncThunk(
  "auth/postLogin",
  async (values: object, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.post(apiConstant.auth.login, values);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postLoginWithGoogle = createAsyncThunk(
  "auth/postLoginWithGoogle",
  async (values: object, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.post(apiConstant.auth.loginWithGG, values);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postRegister = createAsyncThunk(
  "auth/postRegisterWithGoogle",
  async (values: object, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.post(apiConstant.auth.register, values);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isFetching: false,
    error: {},
    userInfor: {},
  },
  reducers: {
    updateUserInfor: (state, action) => {
      state.userInfor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.userInfor = action.payload;
      state.error = {};
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.isFetching = true;
      state.error = action.error;
      state.userInfor = {};
    });
  },
});

const authReducer = authSlice.reducer;
export const { updateUserInfor } = authSlice.actions;

export default authReducer;
