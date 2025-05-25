import apiConstant from "@src/constants/api.constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestMethod } from "@src/hooks/useHookReducers";

export const postContact = createAsyncThunk(
  "auth/postContact",
  async (parmas: object, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.post(apiConstant.contact, parmas);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
  },
  reducers: {
  },
});

const contactReducer = contactSlice.reducer;

export default contactReducer;
