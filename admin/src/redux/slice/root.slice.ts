import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "user",
  initialState: {
    appLoading: true,
  },
  reducers: {
    setAppLoading: (state) => {
      state.appLoading = false;
    },
  },
});

const { reducer: appReducer, actions } = rootSlice;
export const { setAppLoading } = actions;
export default appReducer;
