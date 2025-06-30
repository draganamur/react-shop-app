import { createSlice } from "@reduxjs/toolkit";
interface Config {
  designVersion: number;
}
const initialState: Config = {
  designVersion: 3,
};
export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setDesignVersion: (state, action) => {
      state.designVersion = action.payload;
    },
  },
});

export const configActions = configSlice.actions;
export default configSlice.reducer;
