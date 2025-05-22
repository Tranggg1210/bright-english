import apiConstant from "@src/constants/api.constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestMethod } from "@src/hooks/useHookReducers";


export const getProgressUser = createAsyncThunk(
    "users/getProgressUser",
    async ({
        id,
        parmas
    }: {
        id: string;
        parmas: object
    }, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.users.progress(id), {
                params: parmas
            });
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

export const getTrackingTime = createAsyncThunk(
    "users/getTrackingTime",
    async ({
        id,
        parmas
    }: {
        id: string;
        parmas: object
    }, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.studyTrackingTime.id(id), {
                params: parmas
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const updateTrackingTime = createAsyncThunk(
    "users/updateTrackingTime",
    async (parmas: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.post(apiConstant.studyTrackingTime.post, parmas);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export interface UserInfoState {
    isFetching: boolean;
    error: any;
    dataStudy: any[];
}
const initialState: UserInfoState = {
    isFetching: false,
    error: {},
    dataStudy: [],
};


const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        increaseTodayTimeLearn: (state) => {
            const todayItem = state.dataStudy.find(item => item.timeText === "Hôm nay");
            if (todayItem) {
                todayItem.timeLearn += 1;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTrackingTime.pending, (state) => {
            state.isFetching = true;
        });
        builder.addCase(getTrackingTime.fulfilled, (state, action) => {
            state.isFetching = false;
            state.dataStudy = action.payload?.data?.records;
            state.error = {};
        });
        builder.addCase(getTrackingTime.rejected, (state, action) => {
            state.isFetching = true;
            state.error = action.error;
            state.dataStudy = [];
        });
    },
});

const usersReducer = usersSlice.reducer;
export const { increaseTodayTimeLearn } = usersSlice.actions;

export default usersReducer;
