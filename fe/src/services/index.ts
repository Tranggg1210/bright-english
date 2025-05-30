import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import usersReducer from "./users";
import contactReducer from "./contact";
import sidebarReducer from "./sidebar";
import flashcardReducer from "./flashcard";
import grammarReducer from "./grammar";
import reportsReducer from "./report";
import userVocabularysReducer from "./user-vocabulary";
import exercisesReducer from "./exercise";
import conversationReducer from "./conversation";

const stores = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        flashcard: flashcardReducer,
        conatct: contactReducer,
        sidebar: sidebarReducer,
        grammar: grammarReducer,
        report: reportsReducer,
        userVocabulary: userVocabularysReducer,
        exercises: exercisesReducer,
        convetsation: conversationReducer
    }
});

export type RootState = ReturnType<typeof stores.getState>;
export type AppDispatch = typeof stores.dispatch;
export default stores;
