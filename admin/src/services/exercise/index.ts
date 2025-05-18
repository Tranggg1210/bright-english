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
            const response = await RequestMethod.get(apiConstant.exercises.id(params._id), { });
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


export const createExercise = createAsyncThunk(
    "exercises/createExercise",
    async (data: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.post(apiConstant.exercises.init, data);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const updateExercise = createAsyncThunk(
    "exercises/updateExercise",
    async (
        { id, exercise }: { id: string; exercise: any },
        { rejectWithValue }
    ) => {
        try {
            const response = await RequestMethod.put(apiConstant.exercises.id(id), exercise);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const deleteExercise = createAsyncThunk(
    "exercises/deleteExercise",
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.delete(apiConstant.exercises.id(params._id), params);
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
