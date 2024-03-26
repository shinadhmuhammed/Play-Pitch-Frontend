import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isLoggedIn: false,
    userEmail : null,
    token:null
  };

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      userLogin(state, action) {
        state.isLoggedIn = true;
        state.userEmail = action.payload.userEmail;
        state.token = action.payload.token;
      },
      userLogout(state) {
        state.isLoggedIn = false;
        state.userEmail = null
      },
    },
  });
  
  export const { userLogin, userLogout } = authSlice.actions;
  export default authSlice.reducer;