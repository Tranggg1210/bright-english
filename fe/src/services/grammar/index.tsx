import apiConstant from "@src/constants/api.constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestMethod } from "@src/hooks/useHookReducers";

export const getListGrammar = createAsyncThunk(
    "grammar/getListGrammar",
    async (parmas: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.grammar.init, {
                params: parmas
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const grammarSlice = createSlice({
    name: "grammar",
    initialState: {
    },
    reducers: {

    },
});

const grammarReducer = grammarSlice.reducer;
export const { } = grammarSlice.actions;

export default grammarReducer;
