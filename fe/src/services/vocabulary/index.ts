import apiConstant from "@src/constants/api.constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestMethod } from "@src/hooks/useHookReducers";

export const getListVocabulary = createAsyncThunk(
    "vocabularys/getListVocabulary",
    async (parmas: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.vocabularys.init, {
                params: parmas
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const createVocabulary = createAsyncThunk(
    "vocabularys/createVocabulary",
    async (data: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.post(apiConstant.vocabularys.init, data, true);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const updateVocabulary = createAsyncThunk(
    "vocabularys/updateVocabulary",
    async (parmas: {
        id: string,
        vocabulary: any;
    }, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.put(apiConstant.vocabularys.id(parmas.id), parmas.vocabulary, true);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const deleteVocabulary = createAsyncThunk(
    "vocabularys/deleteVocabulary",
    async (parmas: any, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.delete(apiConstant.vocabularys.id(parmas._id), parmas);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const lockedVocabulary = createAsyncThunk(
    "vocabularys/lockedVocabulary",
    async (parmas: any, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.patch(apiConstant.vocabularys.id(parmas._id), parmas);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const vocabularysSlice = createSlice({
    name: "vocabularys",
    initialState: {
    },
    reducers: {

    },
});

const vocabularysReducer = vocabularysSlice.reducer;
export const { } = vocabularysSlice.actions;

export default vocabularysReducer;
