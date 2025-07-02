import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  REACT_APP_DEFAULT_USER,
  REACT_APP_DEFAULT_PASS,
} from "../../enviroments";
import { UserType, AuthState } from "../../interfaces";
import {
  removeAuthFromLocalStorage,
  setAuthToLocalStorage,
} from "../../data/localStorage";
import { passwordValidation } from "../../utils/authentication";

const testUser: UserType = {
  username: REACT_APP_DEFAULT_USER,
  password: REACT_APP_DEFAULT_PASS,
};

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) {
      const { username, password } = action.payload;

      const passwordError = passwordValidation(password);
      if (passwordError) {
        state.error = passwordError;
        return;
      }

      if (username === testUser.username && password === testUser.password) {
        state.isAuthenticated = true;
        state.user = { username };
        state.error = null;
        setAuthToLocalStorage({ token: "test_token", user: username });
      } else {
        state.error = "Invalid username or password";
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      removeAuthFromLocalStorage();
    },
    restoreSession: (state, action: PayloadAction<{ username: string }>) => {
      state.isAuthenticated = true;
      state.user = { username: action.payload.username };
      state.error = null;
    },
  },
});

export const { login, logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;
