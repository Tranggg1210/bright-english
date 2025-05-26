import apiConstant from "@src/constants/api.constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestMethod } from "@src/hooks/useHookReducers";

export const getListExercise = createAsyncThunk(
    "exercises/getListExercise",
    async (params: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.exercises.init, { params });
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getListExerciseByTopicId = createAsyncThunk(
    "exercises/getListExerciseByTopicId",
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.exercises.seachByTopicId(params.id), { params });
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getExerciseById = createAsyncThunk(
    "exercises/getExerciseById",
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.exercises.id(params._id), {});
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getLogByExerciseId = createAsyncThunk(
    "exercises/getLogByExerciseId",
    async ({
        _id
    }: {
        _id: string;
    }, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.logs.id(_id), {});
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


export const createLogsById = createAsyncThunk(
    "exercises/createLogsById",
    async (data: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.post(apiConstant.logs.init, data);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const updateLogsById = createAsyncThunk(
    "exercises/updateLogsById",
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




const exercisesSlice = createSlice({
    name: "exercises",
    initialState: {},
    reducers: {},
});

const exercisesReducer = exercisesSlice.reducer;
export default exercisesReducer;
