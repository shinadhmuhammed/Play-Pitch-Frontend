import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initialState = {
  isLoggedIn: false,
  adminEmail: null
};

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
      isLoggedIn: false,
      adminEmail: null,
      token: null
    },
    reducers: {
      adminLogin(state, action) {
        state.isLoggedIn = true;
        state.adminEmail = action.payload.adminEmail;
        state.token = action.payload.token;
      },
      adminLogout(state) {
        state.isLoggedIn = false;
        state.adminEmail = null;
        state.token = null;
      }
    }
  });
  
  export const { adminLogin, adminLogout } = adminSlice.actions;
  export default adminSlice.reducer;

