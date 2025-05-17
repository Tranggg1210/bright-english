import apiConstant from "@src/constants/api.constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestMethod } from "@src/hooks/useHookReducers";

export const getListReport = createAsyncThunk(
    "report/getListReport",
    async (parmas: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.report.init, {
                params: parmas
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const updateReport = createAsyncThunk(
    "report/updateReport",
    async (parmas: {
        id: string,
        report: any;
    }, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.put(apiConstant.report.id(parmas.id), parmas.report);
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
