import apiConstant from "@src/constants/api.constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestMethod } from "@src/hooks/useHookReducers";

export const getListGrammar = createAsyncThunk(
    "grammars/getListGrammar",
    async (params: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.grammars.init, { params });
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getGrammarById = createAsyncThunk(
    "grammars/getGrammarById",
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.grammars.id(params._id), {});
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


export const createGrammar = createAsyncThunk(
    "grammars/createGrammar",
    async (data: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.post(apiConstant.grammars.init, data);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const updateGrammar = createAsyncThunk(
    "grammars/updateGrammar",
    async (
        { id, grammar }: { id: string; grammar: any },
        { rejectWithValue }
    ) => {
        try {
            const response = await RequestMethod.put(apiConstant.grammars.id(id), grammar);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const deleteGrammar = createAsyncThunk(
    "grammars/deleteGrammar",
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.delete(apiConstant.grammars.id(params._id), params);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const grammarsSlice = createSlice({
    name: "grammars",
    initialState: {},
    reducers: {},
});

const grammarsReducer = grammarsSlice.reducer;
export default grammarsReducer;
