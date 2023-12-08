import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/userSlice";
import { AuthApi } from "./api/AuthApi";
import { SchemeApi } from "./api/SchemeApi";
import { FilterApi } from "./api/FilterApi";

export const store = configureStore({
  reducer: {
    User: UserReducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [SchemeApi.reducerPath]: SchemeApi.reducer,
    [FilterApi.reducerPath]: FilterApi.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      AuthApi.middleware,
      SchemeApi.middleware,
      FilterApi.middleware,
    ]),
});
