import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/userSlice";
import { AuthApi } from "./api/AuthApi";
import { SchemeApi } from "./api/SchemeApi";
import { FilterApi } from "./api/FilterApi";

export const store = configureStore({
  reducer: {
    User: UserReducer, // UserReducer slice
    [AuthApi.reducerPath]: AuthApi.reducer, // AuthApi slice
    [SchemeApi.reducerPath]: SchemeApi.reducer,
    [FilterApi.reducerPath]:FilterApi.reducer,// FilterApi slice
  },
  devTools: process.env.NODE_ENV === "development", // Enable Redux DevTools in development
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([AuthApi.middleware, SchemeApi.middleware,FilterApi.middleware]),
});
