import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import usersReducer from "./users";
import topicsReducer from "./topic";
import vocabularysReducer from "./vocabulary";
import reportsReducer from "./report";
import contactsReducer from "./contact";
import exercisesReducer from "./exercise";
import uploadReducer from "./upload";
import conversationsReducer from "./conversation";
import grammarsReducer from "./grammar";

const stores = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        topics: topicsReducer,
        vocabulary: vocabularysReducer,
        report: reportsReducer,
        contact: contactsReducer,
        exercise: exercisesReducer,
        upload: uploadReducer,
        conversation: conversationsReducer,
        grammar: grammarsReducer
    }
});

export type RootState = ReturnType<typeof stores.getState>;
export type AppDispatch = typeof stores.dispatch;
export default stores;
