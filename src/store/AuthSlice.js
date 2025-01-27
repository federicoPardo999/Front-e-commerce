import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  role: null,
  token: null,
  isAuthenticated: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
        const{username, role, token} = action.payload;
        state.username = username;
        state.role = role;
        state.token = token;
        state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
        state.username = null;
        state.role = null;
        state.token = null;
        state.isAuthenticated = false
    }
  },
});

export const { setCredentials, clearCredentials } = userSlice.actions;
export default userSlice.reducer;
