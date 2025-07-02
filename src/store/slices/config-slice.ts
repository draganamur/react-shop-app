import { createSlice } from "@reduxjs/toolkit";
import { REACT_APP_DEFAULT_DESIGN } from "../../enviroments";
import { Config } from "../../interfaces";

const initialState: Config = {
  designVersion: REACT_APP_DEFAULT_DESIGN,
  hasLostInternetConnection: false,
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setHasLostInternetConnection: (state, action) => {
      state.hasLostInternetConnection = action.payload;
    },
    setDesignVersion: (state, action) => {
      state.designVersion = action.payload;
    },
  },
});

export const { setHasLostInternetConnection, setDesignVersion } =
  configSlice.actions;
export default configSlice.reducer;
