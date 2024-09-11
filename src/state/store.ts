import { configureStore } from "@reduxjs/toolkit";
import ActivityReducer from "./Slices/ActivitySlice";
import ToastReducer from "./Slices/ToastSlice";

export const store = configureStore({
  reducer: {
    Activity:ActivityReducer,
    Toast:ToastReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;