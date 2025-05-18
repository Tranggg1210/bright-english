import apiConstant from "@src/constants/api.constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestMethod } from "@src/hooks/useHookReducers";

export const uploadFile = createAsyncThunk(
    "upload/uploadFile",
    async (file: any, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.upload(apiConstant.upload.init,file );
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


const uploadSlice = createSlice({
    name: "upload",
    initialState: {
    },
    reducers: {

    },
});

const uploadReducer = uploadSlice.reducer;
export const { } = uploadSlice.actions;

export default uploadReducer;
