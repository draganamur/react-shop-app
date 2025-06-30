import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserType = {
  username: string;
  password?: string;
};

const testUser: UserType = {
  username: "admin",
  password: "Admin123$",
};

type AuthState = {
  isAuthenticated: boolean;
  user: UserType | null;
  error: string | null;
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

      if (!/[A-Z]/.test(password)) {
        state.error = "Password must contain at least one uppercase letter";
        return;
      }
      if (!/[a-z]/.test(password)) {
        state.error = "Password must contain at least one lowercase letter";
        return;
      }
      if (!/\d/.test(password)) {
        state.error = "Password must contain at least one digit";
        return;
      }
      if (!/[^a-zA-Z0-9]/.test(password)) {
        state.error = "Password must contain at least one special character";
        return;
      }

      if (username === testUser.username && password === testUser.password) {
        state.isAuthenticated = true;
        state.user = { username };
        state.error = null;
        localStorage.setItem("user", username);
      } else {
        state.error = "Invalid username or password";
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    restoreSession: (state, action: PayloadAction<{ username: string }>) => {
      state.isAuthenticated = true;
      state.user = { username: action.payload.username };
      state.error = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
