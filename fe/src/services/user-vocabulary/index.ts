import apiConstant from "@src/constants/api.constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestMethod } from "@src/hooks/useHookReducers";

export const updateUserVocabulary = createAsyncThunk(
    "userVocabulary/updateUserVocabulary",
    async (values: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.post(apiConstant.userVocabulary.init, values);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


const userVocabularySlice = createSlice({
    name: "user-vocabulary",
    initialState: {
    },
    reducers: {

    },
});

const userVocabularysReducer = userVocabularySlice.reducer;
export const { } = userVocabularySlice.actions;

export default userVocabularysReducer;
