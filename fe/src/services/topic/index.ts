import apiConstant from "@src/constants/api.constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestMethod } from "@src/hooks/useHookReducers";

export const getListTopic = createAsyncThunk(
    "topics/getListTopic",
    async (params: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.topics.init, { params });
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const createTopic = createAsyncThunk(
    "topics/createTopic",
    async (data: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.post(apiConstant.topics.init, data);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const updateTopic = createAsyncThunk(
    "topics/updateTopic",
    async (
        { id, topic }: { id: string; topic: any },
        { rejectWithValue }
    ) => {
        try {
            const response = await RequestMethod.put(apiConstant.topics.id(id), topic);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const deleteTopic = createAsyncThunk(
    "topics/deleteTopic",
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.delete(apiConstant.topics.id(params._id), params);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export interface TopicsState {
    topics: any[];
    loading: boolean;
    error: unknown | null;
}

const initialState: TopicsState = {
    topics: [],
    loading: false,
    error: null,
};

const topicsSlice = createSlice({
    name: "topics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListTopic.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getListTopic.fulfilled, (state, action) => {
                state.loading = false;
                state.topics = action.payload.data.topics;
            })
            .addCase(getListTopic.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

const topicsReducer = topicsSlice.reducer;
export default topicsReducer;
