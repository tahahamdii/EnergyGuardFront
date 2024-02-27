import { configureStore } from "@reduxjs/toolkit";
import ActivityReducer from "./Activity/ActivitySlice";

export const store = configureStore({
  reducer: {
    Activity:ActivityReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;