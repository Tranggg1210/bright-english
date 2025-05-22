import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        isFullSidebar: false
    },
    reducers: {
        setIsFullSidebar: (state, action) => {
            state.isFullSidebar = action.payload;
        }
    },
});

const sidebarReducer = sidebarSlice.reducer;
export const { setIsFullSidebar } = sidebarSlice.actions;

export default sidebarReducer;
