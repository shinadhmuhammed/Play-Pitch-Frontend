import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  ownerEmail: null,
  token:null
};

const ownerSlice = createSlice({
  name: 'owner',
  initialState,
  reducers: {
    ownerLogin(state, action) {
      state.isLoggedIn = true;
      state.ownerEmail = action.payload.ownerEmail;
      state.token = action.payload.token;
    },
    ownerLogout(state) {
      state.isLoggedIn = false;
      state.ownerEmail = null;
    }
  }
});

export const { ownerLogin, ownerLogout } = ownerSlice.actions;
export default ownerSlice.reducer;