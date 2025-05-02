import apiConstant from "@src/constants/api.constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestMethod } from "@src/hooks/useHookReducers";

export const getListUser = createAsyncThunk(
    "users/getListUser",
    async (parmas: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.users.init, parmas);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const createUser = createAsyncThunk(
    "users/createUser",
    async (data: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.post(apiConstant.users.init, data, true);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const updateUser = createAsyncThunk(
    "users/updateUser",
    async (parmas: {
        id: string,
        user: any;
    }, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.put(apiConstant.users.id(parmas.id), parmas.user, true);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (parmas: any, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.delete(apiConstant.users.id(parmas._id), parmas);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const lockedUser = createAsyncThunk(
    "users/lockedUser",
    async (parmas: any, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.patch(apiConstant.users.id(parmas._id), parmas);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState: {
    },
    reducers: {

    },
});

const usersReducer = usersSlice.reducer;
export const { } = usersSlice.actions;

export default usersReducer;
