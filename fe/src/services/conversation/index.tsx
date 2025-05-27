import apiConstant from "@src/constants/api.constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestMethod } from "@src/hooks/useHookReducers";

export const getListConversation = createAsyncThunk(
    "conversation/getListConversation",
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
    "conversation/getListConversationByTopicId",
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
    "conversation/getConversationById",
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.conversations.id(params._id), {});
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getLogByConversationId = createAsyncThunk(
    "conversation/getLogByConversationId",
    async ({
        _id
    }: {
        _id: string;
    }, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.logs.exerId(_id), {});
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const updateLogsById = createAsyncThunk(
    "conversation/updateLogsById",
    async ({
        data,
        id
    }: {
        id: string;
        data: any;
    }, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.put(apiConstant.logs.id(id), data);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


const conversationSlice = createSlice({
    name: "conversation",
    initialState: {},
    reducers: {},
});

const conversationReducer = conversationSlice.reducer;
export default conversationReducer;
