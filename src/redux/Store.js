import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/UserSlice";
import { AuthApi } from "./api/AuthApi";


export const store = configureStore({
  reducer: {
    User: UserReducer, // UserReducer slice
    [AuthApi.reducerPath]: AuthApi.reducer, // AuthApi slice

  },
  devTools: process.env.NODE_ENV === "development", // Enable Redux DevTools in development
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([AuthApi.middleware]),
});