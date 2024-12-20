import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  id: string | null;
  name: string | null;
  email: string | null;
  role: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    id: null,
    name: null,
    email: null,
    role: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{token: string}>) {
        const { token } = action.payload;
        localStorage.setItem('token', token);
        const payload = JSON.parse(atob(token.split('.')[1]));
        state.isLoggedIn = true;
        state.id = payload.adminId;
        state.email = payload.email;
        state.name = payload.name;
        state.role = payload.role;
    },
    logout(state) {
        localStorage.removeItem('token');
        state.isLoggedIn = false;
        state.id = null;
        state.role = null;
        state.email = null;
        state.name = null;  
    },
    checkAuth: (state) => {
        const token = localStorage.getItem('token');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          state.isLoggedIn = true;
          state.id = payload.adminId;
          state.role = payload.role;
          state.email = payload.email;
          state.name = payload.name;
        } else {
          state.isLoggedIn = false;
          state.id = null;
          state.role = null;
          state.email = null;
          state.name = null;
        }
      },
    },
  });

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;