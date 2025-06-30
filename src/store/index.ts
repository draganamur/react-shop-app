import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";
import cartReducer from "./slices/cart-slice";
import configReducer from "./slices/config-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartReducer,
    config: configReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
