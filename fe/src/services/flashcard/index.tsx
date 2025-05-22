import apiConstant from "@src/constants/api.constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestMethod } from "@src/hooks/useHookReducers";

export const getListTopic = createAsyncThunk(
    "flashcard/getListTopic",
    async (params: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.topics.init, { params });
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


const flashcardSlice = createSlice({
  name: "flashcard",
  initialState: {
  },
  reducers: {
  },
});

const flashcardReducer = flashcardSlice.reducer;

export default flashcardReducer;
