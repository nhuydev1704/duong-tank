import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import appReducer from "./slice/root.slice";
const rootReducer = {
  root: appReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
