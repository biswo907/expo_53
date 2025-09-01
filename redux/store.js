import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // If you have other slices
import { api } from "./services/api";

export const store = configureStore({
  reducer: {
    ...rootReducer, // Your non-RTK reducers combined
    [api.reducerPath]: api.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware)
});
