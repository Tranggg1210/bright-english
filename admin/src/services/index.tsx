import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import usersReducer from "./users";
import topicsReducer from "./topic";

const stores = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        topics: topicsReducer
    }
});

export type RootState = ReturnType<typeof stores.getState>;
export type AppDispatch = typeof stores.dispatch;
export default stores;
