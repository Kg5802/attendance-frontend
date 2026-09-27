import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { api } from "../services/api";
export const store = configureStore({
  reducer: { auth: authReducer, [api.reducerPath]: api.reducer },
  middleware: (g) => g().concat(api.middleware),
});
