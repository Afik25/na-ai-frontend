import { configureStore } from "@reduxjs/toolkit";
import { configurationSlice } from "./slices/configuration";

export const store = configureStore({
  reducer: {
    setInitConf: configurationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
