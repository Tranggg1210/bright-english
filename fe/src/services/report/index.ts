import apiConstant from "@src/constants/api.constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestMethod } from "@src/hooks/useHookReducers";

export const createReport = createAsyncThunk(
    "report/createReport",
    async (values: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.post(apiConstant.report.init, values);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


const reportSlice = createSlice({
    name: "report",
    initialState: {
    },
    reducers: {

    },
});

const reportsReducer = reportSlice.reducer;
export const { } = reportSlice.actions;

export default reportsReducer;
