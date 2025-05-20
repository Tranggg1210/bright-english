import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import usersReducer from "./users";
import topicsReducer from "./topic";
import vocabularysReducer from "./vocabulary";
import contactReducer from "./contact";
import sidebarReducer from "./sidebar";

const stores = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        topics: topicsReducer,
        vocabulary: vocabularysReducer,
        conatct: contactReducer,
        sidebar: sidebarReducer
    }
});

export type RootState = ReturnType<typeof stores.getState>;
export type AppDispatch = typeof stores.dispatch;
export default stores;
