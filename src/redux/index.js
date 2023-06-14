import { combineReducers, configureStore } from "@reduxjs/toolkit";

import todosSlice from "./todosSlice";
import { todoAPI } from "./todoAPI";

const rootReducer = combineReducers({
  todos: todosSlice,
});

export const store = configureStore({
  reducer: {
    rootReducer,
    [todoAPI.reducerPath]: todoAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(todoAPI.middleware),
});
