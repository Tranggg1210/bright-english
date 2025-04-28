import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";

const stores = configureStore({
    reducer: {
        auth: authReducer
    }
});

export type RootState = ReturnType<typeof stores.getState>;
export type AppDispatch = typeof stores.dispatch;
export default stores;
