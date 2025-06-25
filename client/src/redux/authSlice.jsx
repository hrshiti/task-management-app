import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, role, user } = action.payload;
      state.token = token;
      state.role = role;
      state.user = user;

      
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;

      localStorage.clear();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
