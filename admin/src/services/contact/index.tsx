import apiConstant from "@src/constants/api.constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestMethod } from "@src/hooks/useHookReducers";

export const getListContact = createAsyncThunk(
    "contact/getListContact",
    async (parmas: object, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.get(apiConstant.contact.init, {
                params: parmas
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const updateContact = createAsyncThunk(
    "contact/updateContact",
    async (parmas: {
        id: string,
        contact: any;
    }, { rejectWithValue }) => {
        try {
            const response = await RequestMethod.put(apiConstant.contact.id(parmas.id), parmas.contact);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);




const contactSlice = createSlice({
    name: "contact",
    initialState: {
    },
    reducers: {

    },
});

const contactsReducer = contactSlice.reducer;
export const { } = contactSlice.actions;

export default contactsReducer;
