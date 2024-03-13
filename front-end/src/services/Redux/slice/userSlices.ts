import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isLoggedIn: false,
    userEmail : null
  };

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      userLogin(state, action) {
        console.log(action.payload,'payload');
        
        state.isLoggedIn = true;
        state.userEmail = action.payload.userEmail;
      },
      userLogout(state) {
        state.isLoggedIn = false;
        state.userEmail = null
  
      },
    },
  });
  
  export const { userLogin, userLogout } = authSlice.actions;
  export default authSlice.reducer;