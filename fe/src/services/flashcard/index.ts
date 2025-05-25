import apiConstant from "@src/constants/api.constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestMethod } from "@src/hooks/useHookReducers";

export const getListTopic = createAsyncThunk(
  "flashcard/getListTopic",
  async (params: object, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.get(apiConstant.topics.init, {
        params,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getTopicById = createAsyncThunk(
  "flashcard/getTopicById",
  async (
    { id, params }: { id: string; params: object },
    { rejectWithValue }
  ) => {
    try {
      const response = await RequestMethod.get(apiConstant.topics.id(id), {
        params,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getListVocabularyByTopicId = createAsyncThunk(
  "flashcard/getListVocabularyByTopicId",
  async (
    {
      id,
      params,
    }: {
      id: string;
      params: object;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await RequestMethod.get(
        apiConstant.userVocabulary.topicId(id),
        { params }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const resetListVocabularyByTopicId = createAsyncThunk(
  "flashcard/resetListVocabularyByTopicId",
  async (
    {
      id,
    }: {
      id: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await RequestMethod.delete(
        apiConstant.userVocabulary.reset(id)
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const flashcardSlice = createSlice({
  name: "flashcard",
  initialState: {},
  reducers: {},
});

const flashcardReducer = flashcardSlice.reducer;

export default flashcardReducer;
