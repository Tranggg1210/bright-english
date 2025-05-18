import apiConstant from "@src/constants/api.constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestMethod } from "@src/hooks/useHookReducers";

export const getListConversation = createAsyncThunk(
    "conversations/getListConversation",
    async (params: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.conversations.init, { params });
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getListConversationByTopicId = createAsyncThunk(
    "conversations/getListConversationByTopicId",
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.conversations.seachByTopicId(params.id), { params });
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getConversationById = createAsyncThunk(
    "conversations/getConversationById",
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.conversations.id(params._id), { });
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const createConversation = createAsyncThunk(
    "conversations/createConversation",
    async (data: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.post(apiConstant.conversations.init, data);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const updateConversation = createAsyncThunk(
    "conversations/updateConversation",
    async (
        { id, conversation }: { id: string; conversation: any },
        { rejectWithValue }
    ) => {
        try {
            const response = await RequestMethod.put(apiConstant.conversations.id(id), conversation);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const deleteConversation = createAsyncThunk(
    "conversations/deleteConversation",
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.delete(apiConstant.conversations.id(params._id), params);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);



const conversationsSlice = createSlice({
    name: "conversations",
    initialState: {},
    reducers: {},
});

const conversationsReducer = conversationsSlice.reducer;
export default conversationsReducer;
